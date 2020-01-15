#!/usr/bin/env python
# In[ ]:
#  coding: utf-8

###### Searching and Downloading Google Images to the local disk ######

# Import Libraries
import sys
version = (3, 0)
cur_version = sys.version_info
if cur_version >= version:  # If the Current Version of Python is 3.0 or above
    import urllib.request
    from urllib.request import Request, urlopen
    from urllib.request import URLError, HTTPError
    from urllib.parse import quote
    import http.client
    from http.client import IncompleteRead, BadStatusLine
    http.client._MAXHEADERS = 1000
else:  # If the Current Version of Python is 2.x
    import urllib2
    from urllib2 import Request, urlopen
    from urllib2 import URLError, HTTPError
    from urllib import quote
    import httplib
    from httplib import IncompleteRead, BadStatusLine
    httplib._MAXHEADERS = 1000
import time  # Importing the time library to check the time of code execution
import os
import argparse
import ssl
import datetime
import json
import re
import codecs
import socket

args_list = ["keywords", "keywords_from_file", "prefix_keywords", "suffix_keywords",
             "limit", "format", "color", "color_type", "usage_rights", "size",
             "exact_size", "aspect_ratio", "type", "time", "time_range", "delay", "url", "single_image",
             "output_directory", "image_directory", "no_directory", "proxy", "similar_images", "specific_site",
             "print_urls", "print_size", "print_paths", "metadata", "extract_metadata", "socket_timeout",
             "thumbnail", "thumbnail_only", "language", "prefix", "chromedriver", "related_images", "safe_search", "no_numbering",
             "offset", "no_download","save_source","silent_mode","ignore_urls"]


class googleimagesdownload:
    def __init__(self):
        pass

    # Downloading entire Web Document (Raw Page Content)
    def download_page(self,url):
        version = (3, 0)
        cur_version = sys.version_info
        if cur_version >= version:  # If the Current Version of Python is 3.0 or above
            try:
                headers = {}
                headers['User-Agent'] = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"
                req = urllib.request.Request(url, headers=headers)
                resp = urllib.request.urlopen(req)
                respData = str(resp.read())
                return respData
            except Exception as e:
                print("Could not open URL. Please check your internet connection and/or ssl settings \n"
                      "If you are using proxy, make sure your proxy settings is configured correctly")
                sys.exit()
        else:  # If the Current Version of Python is 2.x
            try:
                headers = {}
                headers['User-Agent'] = "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.27 Safari/537.17"
                req = urllib2.Request(url, headers=headers)
                try:
                    response = urllib2.urlopen(req)
                except URLError:  # Handling SSL certificate failed
                    context = ssl._create_unverified_context()
                    response = urlopen(req, context=context)
                page = response.read()
                return page
            except:
                print("Could not open URL. Please check your internet connection and/or ssl settings \n"
                      "If you are using proxy, make sure your proxy settings is configured correctly")
                sys.exit()
                return "Page Not found"

    #Correcting the escape characters for python2
    def replace_with_byte(self,match):
        return chr(int(match.group(0)[1:], 8))

    def repair(self,brokenjson):
        invalid_escape = re.compile(r'\\[0-7]{1,3}')  # up to 3 digits for byte values up to FF
        return invalid_escape.sub(self.replace_with_byte, brokenjson)


    #Format the object in readable format
    def format_object(self,object):
        formatted_object = {}
        formatted_object['image_thumbnail_url'] = object['ou']
        return formatted_object



    #building main search URL
    def build_search_url(self,search_term):
        url = 'https://www.google.com/search?q=' + quote(
            search_term.encode('utf-8')) + '&espv=2&biw=1366&bih=667&site=webhp&source=lnms&tbm=isch&sa=X&ei=XosDVaCXD8TasATItgE&ved=0CAcQ_AUoAg'
        return url


    #keywords from file
    def keywords_from_file(self,file_name):
        search_keyword = []
        with codecs.open(file_name, 'r', encoding='utf-8-sig') as f:
            if '.csv' in file_name:
                for line in f:
                    if line in ['\n', '\r\n']:
                        pass
                    else:
                        search_keyword.append(line.replace('\n', '').replace('\r', ''))
            elif '.txt' in file_name:
                for line in f:
                    if line in ['\n', '\r\n']:
                        pass
                    else:
                        search_keyword.append(line.replace('\n', '').replace('\r', ''))
            else:
                print("Invalid file type: Valid file types are either .txt or .csv \n"
                      "exiting...")
                sys.exit()
        return search_keyword


    # Finding 'Next Image' from the given raw page
    def _get_next_item(self,s):
        start_line = s.find('rg_meta notranslate')
        if start_line == -1:  # If no links are found then give an error!
            end_quote = 0
            link = "no_links"
            return link, end_quote
        else:
            start_line = s.find('class="rg_meta notranslate">')
            start_object = s.find('{', start_line + 1)
            end_object = s.find('</div>', start_object + 1)
            object_raw = str(s[start_object:end_object])
            #remove escape characters based on python version
            version = (3, 0)
            cur_version = sys.version_info
            if cur_version >= version: #python3
                try:
                    object_decode = bytes(object_raw, "utf-8").decode("unicode_escape")
                    final_object = json.loads(object_decode)
                except:
                    final_object = ""
            else:  #python2
                try:
                    final_object = (json.loads(self.repair(object_raw)))
                except:
                    final_object = ""
            return final_object, end_object


    # Getting all links with the help of '_images_get_next_image'
    def _get_all_items(self,page,limit,arguments):
        items = []
        abs_path = []
        errorCount = 0
        i = 0
        count = 1

        while count < limit+1:
            object, end_content = self._get_next_item(page)
            if(object != "no_links"):
                object = self.format_object(object)
                return object['image_thumbnail_url']
            else:
                count += 1

        return False


    # Bulk Download
    def download(self,arguments):
        paths_agg = {}
        paths = self.download_executor(arguments)
        while (paths == False):
            paths = self.download_executor(arguments)

        return paths

    def download_executor(self,arguments):
        paths = {}
        errorCount = None
        for arg in args_list:
            if arg not in arguments:
                arguments[arg] = None

        print("===========================================")
        print(arguments)
        print("===========================================")
        ######Initialization and Validation of user arguments
        if arguments['keywords']:
            search_keyword = [str(item) for item in arguments['keywords'].split(',')]

        if arguments['keywords_from_file']:
            search_keyword = self.keywords_from_file(arguments['keywords_from_file'])

        # both time and time range should not be allowed in the same query
        if arguments['time'] and arguments['time_range']:
            raise ValueError('Either time or time range should be used in a query. Both cannot be used at the same time.')

        # both time and time range should not be allowed in the same query
        if arguments['size'] and arguments['exact_size']:
            raise ValueError('Either "size" or "exact_size" should be used in a query. Both cannot be used at the same time.')

        # both image directory and no image directory should not be allowed in the same query
        if arguments['image_directory'] and arguments['no_directory']:
            raise ValueError('You can either specify image directory or specify no image directory, not both!')

        # Additional words added to keywords
        if arguments['suffix_keywords']:
            suffix_keywords = [" " + str(sk) for sk in arguments['suffix_keywords'].split(',')]
        else:
            suffix_keywords = ['']

        # Additional words added to keywords
        if arguments['prefix_keywords']:
            prefix_keywords = [str(sk) + " " for sk in arguments['prefix_keywords'].split(',')]
        else:
            prefix_keywords = ['']

        # Setting limit on number of images to be downloaded
        if arguments['limit']:
            limit = int(arguments['limit'])
        else:
            limit = 100

        if arguments['url']:
            current_time = str(datetime.datetime.now()).split('.')[0]
            search_keyword = [current_time.replace(":", "_")]

        if arguments['similar_images']:
            current_time = str(datetime.datetime.now()).split('.')[0]
            search_keyword = [current_time.replace(":", "_")]


        # If this argument is present, set the custom output directory

       # main_directory = "downloads"

        # Proxy settings
        if arguments['proxy']:
            os.environ["http_proxy"] = arguments['proxy']
            os.environ["https_proxy"] = arguments['proxy']
            ######Initialization Complete
        total_errors = 0
        for pky in prefix_keywords:                 # 1.for every prefix keywords
            for sky in suffix_keywords:             # 2.for every suffix keywords
                i = 0
                while i < len(search_keyword):      # 3.for every main keyword
                    iteration = "\n" + "Item no.: " + str(i + 1) + " -->" + " Item name = " + (pky) + (search_keyword[i]) + (sky)

                    search_term = pky + search_keyword[i] + sky

                    url = self.build_search_url(search_term)      #building main search url

                    raw_html = self.download_page(url)  # download page

                    path = self._get_all_items(raw_html,limit,arguments)    #get all image items and download images


                    return path





if __name__ == "__main__":
    main()

# In[ ]:

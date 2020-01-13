from flask import Flask,request
from flask_restful import Api, Resource, reqparse
import sqlite3
import json
from flask_cors import CORS

import google_api as Config



app = Flask(__name__)
CORS(app)

@app.route('/image', methods=['GET'])
def get():
    term = request.args.get('term')
    response = Config.googleimagesdownload()   #class instantiation

    arguments = {"keywords":term,"limit":1,"print_urls":True}   #creating list of arguments
    paths = response.download(arguments)   #passing the arguments to the function
    #print(paths)   #printing absolute paths of the downloaded images
    return json.dumps({'result': paths})

#api.add_resource(Image, "/image/<search_term>")

app.run(host='localhost', debug=True);


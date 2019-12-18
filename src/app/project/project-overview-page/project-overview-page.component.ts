import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {HttpClientService} from '../../shared/http-client.service';
import {Router} from '@angular/router';
import {ProjectModel} from '../project.model';
import {CookieService} from 'ngx-cookie-service';




export interface PeriodicElement {
  id: number;
  name: string;
  trips: number;
  km: number;
}


@Component({
  selector: 'app-project-overview-page',
  templateUrl: './project-overview-page.component.html',
  styleUrls: ['./project-overview-page.component.css']
})

export class ProjectOverviewPageComponent implements OnInit {

  private ELEMENT_DATA: PeriodicElement[] = [];
  private lastUpdate: string;

  public displayedColumns: string[];
  public dataSource: MatTableDataSource<PeriodicElement>;
  public loading: boolean;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  value = '';


  constructor(private httpClient: HttpClientService, private router: Router, private cookieService: CookieService) {
    this.displayedColumns = ['id', 'name', 'trips', 'km'];
    if (cookieService.get('projectTableUpdate') === '' || this.getMinutesBetweenDates(cookieService.get('projectTableUpdate'), new Date()) >= 10) {
      this.fetchProjectsFromBackEnd();
    } else {
      this.fetchProjectsFromCookie();
    }
  }

  ngOnInit(){}

  private fetchProjectsFromBackEnd() {
    const projectArr = [];
    const fetchedObj = this.httpClient.onGet('http://localhost:8080/project/getAllProject').pipe()
      .subscribe(
        data => {
          this.ELEMENT_DATA = [];
          data.forEach(dataEl => {
            this.ELEMENT_DATA.push({id: dataEl.id, name: dataEl.name, trips: dataEl.trips.length, km: 1.234});
            projectArr.push(new ProjectModel(dataEl.id, dataEl.name, dataEl.trips));
          });

          this.cookieService.set('projectArr', JSON.stringify(projectArr));
          this.cookieService.set('projectTableUpdate', new Date().toISOString());

          this.parseUpdateTime(this.cookieService.get('projectTableUpdate'));

          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.onDataInit();

          this.loading = false;
        },
        error => {
          console.log(error);
        });
  }

  private fetchProjectsFromCookie(){
    this.parseUpdateTime(this.cookieService.get('projectTableUpdate'));
    JSON.parse(this.cookieService.get('projectArr')).forEach(projects => {
      this.ELEMENT_DATA.push({id: projects.id, name: projects.name, trips: projects.trips.length, km: 1.234});
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.onDataInit();
    });
  }

  private parseUpdateTime(date: string){
    const dateObj = new Date(date);
    const minutes   = ('' + dateObj.getMinutes()).length === 1 ? '0' + dateObj.getMinutes() : dateObj.getMinutes();
    const hours     = ('' + dateObj.getHours()).length === 1  ? '0' + dateObj.getHours() : dateObj.getHours();
    const days      = ('' + dateObj.getDate()).length === 1  ? '0' + dateObj.getDate() : dateObj.getDate();
    const month     = ('' + dateObj.getMonth()).length === 1  ? '0' + dateObj.getMonth() : dateObj.getMonth();
    const year      = dateObj.getFullYear();

    this.lastUpdate = days + '-' + month + '-' + year + ' ' + hours + ':' + minutes;
  }

  private onDataInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private filterProjectTable(event) {
    this.dataSource.filter = event.target.value;
    this.value = event.target.value;
  }

  private getMinutesBetweenDates(startDate, endDate) {
    startDate = new Date(startDate);
    const diff = endDate.getTime() - startDate.getTime();
    return (diff / 60000);
  }

  public updateTable(event) {
    this.loading = true;
    this.fetchProjectsFromBackEnd();
  }

  public clearSearch(){
    this.dataSource.filter = '';
    this.value = '';
  }

  public openProjectPage(event) {
    this.router.navigate(['projecten/'+event.target.parentNode.children[0].id]);
  }


}

import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {HttpClientService} from '../shared/http-client.service';
import {Router} from '@angular/router';




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

  public displayedColumns: string[];
  public dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  value = '';


  constructor(private httpClient: HttpClientService, public router: Router) {
    this.displayedColumns = ['id', 'name', 'trips', 'km'];
    const fetchedObj = this.httpClient.onGet('http://localhost:8080/project/getAllProject').pipe()
      .subscribe(
        data => {
          data.forEach(dataEl => {
            this.ELEMENT_DATA.push({id: dataEl.id, name: dataEl.name, trips: dataEl.trips.length, km: 1.234});
          });
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.onDataInit();
        },
        error => {
          console.log(error);
    });
  }

  ngOnInit(){}

  private onDataInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private filterProjectTable(event) {
    this.dataSource.filter = event.target.value;
    this.value = event.target.value;
  }

  public clearSearch(){
    this.dataSource.filter = '';
    this.value = '';
  }

  public openProjectPage(event) {
    this.router.navigate(['projecten/'+event.target.parentNode.children[0].id]);
  }

}

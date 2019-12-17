import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClientService } from '../shared/http-client.service';

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

export class ProjectOverviewPageComponent implements OnInit, AfterViewInit {

  public ELEMENT_DATA: PeriodicElement[];

  public displayedColumns: string[];
  public dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  value = '';


  constructor(private httpClientService: HttpClientService) {
    this.displayedColumns = ['id', 'name', 'trips', 'km'];
   }

  ngOnInit() {

   }

  ngAfterViewInit() {
    const fetchedObj = this.httpClientService.onGet('http://localhost:8080/project/getAllProject').pipe()
      .subscribe(
        data => {
          console.log(data);
          console.log(this.ELEMENT_DATA);
          console.log(this.dataSource);
          data.forEach(function (value) {
            this.ELEMENT_DATA.push({id: value.id, name: value.name, trips: value.trips.length, km: 1.234});
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          });
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error => {
          console.log(error);
        }
      );
  }

  filterProjectTable(event){
    this.dataSource.filter = event.target.value;
    this.value = event.target.value;
  }
  clearSearch(){
    this.dataSource.filter = '';
    this.value = '';
  }

}

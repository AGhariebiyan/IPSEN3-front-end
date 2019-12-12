import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';




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

  private ELEMENT_DATA: PeriodicElement[] = [
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},
    {id: 1, name: 'Hydrogen', trips: 1.0079, km: 1.234},


  ];

  displayedColumns: string[];
  dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  value = '';


  constructor() {
    this.displayedColumns = ['id', 'name', 'trips', 'km'];
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
   }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {EventEmitter} from 'events';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {HttpClientService} from '../../shared/http-client.service';
import {Vehicle} from './vehicle.model';
import {SelectionModel} from '@angular/cdk/collections';
import {Router} from '@angular/router';

@Component({
  selector: 'app-vehicle-delete',
  templateUrl: './vehicle-overview.component.html',
  styleUrls: ['./vehicle-overview.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VehicleOverviewComponent implements OnInit {



  selectedVehiclesIdsArray: Array<number> = [];

  result: EventEmitter = new EventEmitter();
  public vehiclesArray: Vehicle[] = [];
  data = Object.assign(this.vehiclesArray);
  displayedColumns: string[];
  dataSource1: MatTableDataSource<Vehicle> = new MatTableDataSource<Vehicle>();
  selection = new SelectionModel<Vehicle>(true, []);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  value = '';


  constructor(private httpClientService: HttpClientService, private router: Router) {
    this.displayedColumns = ['select', 'licensePlate', 'vehicleName', 'vehicleType', 'verwijderen'];
    this.getVehicles();
  }

  ngOnInit() {

    this.result.on('refreshVehiclesTable', () => {
      this.getVehicles();
      // window.location.reload();
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource1.data.length;
    return numSelected === numRows;
  }


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource1.data.forEach(row => this.selection.select(row));
  }

  deleteSelected(selectedID: number, event) {

    if (event.checked) {
      this.selectedVehiclesIdsArray.push(selectedID);
    }
    // console.log(selectedID);
  }

  select(event, vehicleId: number, index: number) {
    // console.log(vehicleId);
    console.log(this.selectedVehiclesIdsArray);
    if (event.checked) {
      this.selectedVehiclesIdsArray.push(vehicleId);
    } else {
      // this.selectedVehiclesIdsArray.splice(index, 1);
      for (let i = 0; i <= this.selectedVehiclesIdsArray.length; i++) {
        if (this.selectedVehiclesIdsArray[i] === vehicleId) {
          this.selectedVehiclesIdsArray.splice(i, 1);
        }
      }
    }
    // console.log(this.selectedVehiclesIdsArray);
  }

  editVehicle(id: number) {

    return id;
  }

  deleteVehicle(id: number) {
    this.httpClientService.onDelete('http://localhost:8080/vehicles/delete/' + id).subscribe(() => {
      this.result.emit('refreshVehiclesTable');
    });
  }


  removeSelectedRows() {
    console.log('Removed:', this.selectedVehiclesIdsArray);
    this.httpClientService.onPostNew('http://localhost:8080/vehicles/delete', this.selectedVehiclesIdsArray).subscribe(() => {
      this.result.emit('refreshVehiclesTable');
    });
  }

  getVehicles() {

    this.httpClientService.onGet('http://localhost:8080/vehicles/user/1')
      .subscribe(
        data => {
          console.log(this.vehiclesArray);
          this.vehiclesArray = [];
          data.forEach(dataE => {
              this.vehiclesArray.push({
                vehicleId: dataE.vehicle_id,
                userId: dataE.userId,
                licensePlate: dataE.licensePlate,
                vehicleName: dataE.vehicleName,
                vehicleType: dataE.vehicleType,
                fuel: dataE.fuel,
                vehicleBody: dataE.vehicleBody
              });
            }
          );
          this.dataSource1.data = this.vehiclesArray;
          this.dataSource1.sort = this.sort;
          this.dataSource1.paginator = this.paginator;
        }
      );

  }


  filterTripsTable(event) {
    this.dataSource1.filter = event.target.value;
    this.value = event.target.value;
  }


}

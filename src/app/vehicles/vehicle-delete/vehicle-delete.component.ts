import {Component, OnInit, ViewChild} from '@angular/core';
import {EventEmitter} from 'events';
import {Trip} from '../../trips/trip-delete/trip-delete.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {HttpClientService} from '../../shared/http-client.service';
import {Vehicle} from './vehicle.model';

@Component({
  selector: 'app-vehicle-delete',
  templateUrl: './vehicle-delete.component.html',
  styleUrls: ['./vehicle-delete.component.css']
})
export class VehicleDeleteComponent implements OnInit {

  result: EventEmitter = new EventEmitter();

  public vehiclesArray: Vehicle[] = [];
  displayedColumns: string[];
  dataSource1: MatTableDataSource<Vehicle> = new MatTableDataSource<Vehicle>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  value = '';


  constructor(private httpClientService: HttpClientService) {
    this.displayedColumns = ['licensePlate', 'vehicleName', 'vehicleType', 'totalTrips', 'verwijder', 'wijzigen'];
    this.getVehicles();
  }

  ngOnInit() {

    this.result.on('deleteVehicle', () => {
      this.getVehicles();
      // window.location.reload();
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
                vehicleId: dataE.vehicleId,
                userId: dataE.userId,
                licensePlate: dataE.licensePlate,
                vehicleName: dataE.vehicleName,
                vehicleType: dataE.vehicleType,
                totalTrips: dataE.totalTrips,
              });
            }
          );
          this.dataSource1.data = this.vehiclesArray;
          this.dataSource1.sort = this.sort;
          this.dataSource1.paginator = this.paginator;
        }
      );

  }


  editVehicle(id: number) {
    return id;
  }

  deleteVehicle(id: number) {
    this.httpClientService.onDelete('http://localhost:8080/vehicles/delete/' + id).subscribe(() => {
      this.result.emit('deleteVehicle');
    });
  }

  filterTripsTable(event) {
    this.dataSource1.filter = event.target.value;
    this.value = event.target.value;
  }


}

import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {EventEmitter} from 'events';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {HttpClientService} from '../../shared/http-client.service';
import {Vehicle} from './vehicle.model';
import {SelectionModel} from '@angular/cdk/collections';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

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


  constructor(private httpClientService: HttpClientService,
              private router: Router,
              private toaster: ToastrService
  ) {
    this.displayedColumns = ['select', 'licensePlate', 'vehicleName', 'vehicleType', 'verwijderen'];
    this.getVehicles();
  }

  ngOnInit() {

    this.result.on('refreshVehiclesTable', () => {
      this.getVehicles();
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
    if (this.isAllSelected()) {
      for (let i = 0; i <= this.selectedVehiclesIdsArray.length; i++) {
        this.dataSource1.data.forEach(row => {
          if (this.selectedVehiclesIdsArray[i] === row.vehicleId) {
            this.selectedVehiclesIdsArray.splice(i, 1);
          }
        });
      }
      this.selection.clear();
    } else {
      this.dataSource1.data.forEach(row => this.selection.select(row));
      this.dataSource1.data.forEach(row => this.selectedVehiclesIdsArray.push(row.vehicleId));
    }

  }


  select(event, vehicleId: number) {
    if (event.checked) {
      this.selectedVehiclesIdsArray.push(vehicleId);
    } else {
      for (let i = 0; i <= this.selectedVehiclesIdsArray.length; i++) {
        if (this.selectedVehiclesIdsArray[i] === vehicleId) {
          this.selectedVehiclesIdsArray.splice(i, 1);
        }
      }
    }
  }

  deleteVehicle(id: number) {
    this.httpClientService.onDelete('/vehicles/delete/' + id).subscribe(() => {
      this.toaster.success('Het voertuig is succesvol verwijderd.', 'Voertuig verwijderd!', {
        positionClass: 'toast-bottom-left'
      });
      this.result.emit('refreshVehiclesTable');
    });
  }


  removeSelectedRows() {
    console.log('Removed:', this.selectedVehiclesIdsArray);
    this.httpClientService.onPost('/vehicles/delete', this.selectedVehiclesIdsArray).subscribe(() => {
      this.result.emit('refreshVehiclesTable');
    });
  }

  getVehicles() {

    this.httpClientService.onGet('/vehicles/user/' +   localStorage.getItem('userid'))
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

  onClick(licensePlate: string) {
    this.router.navigate(['ritten/voertuig/' + licensePlate]);
  }


}

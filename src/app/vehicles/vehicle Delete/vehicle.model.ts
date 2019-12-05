export class Vehicle {
  licensePlate: string;
  vehicleName: string;
  vehicleType: string;
  totalTrips: number;


  constructor(licensePlate: string, vehicleName: string, vehicleType: string, totalTrips: number) {
    this.licensePlate = licensePlate;
    this.vehicleName = vehicleName;
    this.vehicleType = vehicleType;
    this.totalTrips = totalTrips;

    }
}

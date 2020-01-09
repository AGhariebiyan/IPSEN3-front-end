export class Vehicle {
  userId: number;
  vehicleId: number;
  licensePlate: string
   vehicleName: string
   vehicleType: string
   totalTrips: number


  constructor(vehicleId: number, userId: number, licensePlate: string, vehicleName: string, vehicleType: string, totalTrips: number) {
    this.userId = userId;
    this.licensePlate = licensePlate;
    this.vehicleName = vehicleName;
    this.vehicleType = vehicleType;
    this.totalTrips = totalTrips;
  }
}

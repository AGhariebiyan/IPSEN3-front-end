export class Vehicle {
  userId: number;
  vehicleId: number;
  licensePlate: string
   vehicleName: string
   vehicleType: string
fuel: string;
  vehicleBody: string

  constructor(vehicleId: number, userId: number, licensePlate: string, vehicleName: string, vehicleType: string, fuel: string, vehicleBody: string) {
    this.userId = userId;
    this.licensePlate = licensePlate;
    this.vehicleName = vehicleName;
    this.vehicleType = vehicleType;
    this.fuel = fuel;
    this.vehicleBody = vehicleBody;
  }
}

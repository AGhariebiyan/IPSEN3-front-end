export class Trip {
  tripId: number;
  projectId: number;
  userId: number;
  licensePlate: string;
  startLocation: string;
  endLocation: string;
  startKilometergauge: number;
  endKilometergauge: number;


  constructor(id: number, projectId: number, userId: number, licensePlate: string, startLocation: string,
              endLocation: string, startKilometergauge: number, endKilometergauge: number) {
    this.tripId = id;
    this.projectId = projectId;
    this.userId = userId;
    this.licensePlate = licensePlate;
    this.startLocation = startLocation;
    this.endLocation = endLocation;
    this.startKilometergauge = startKilometergauge;
    this.endKilometergauge = endKilometergauge;
  }
}

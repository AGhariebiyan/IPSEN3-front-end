import {Trip} from '../trips/trip.model';

export class ProjectModel{
  private id: number;
  private name: string;
  private trips: [Trip];
  private totalDrivenKm;

  constructor(id: number, name: string, trips: [Trip], totalDrivenKm: number ) {
    this.id = id;
    this.name = name;
    this.trips = trips;
    this.totalDrivenKm = totalDrivenKm;
  }

  public getId() {
    return this.id;
  }
  public getName() {
    return this.name;
  }
  public getTrips() {
    return this.trips;
  }
  public getTotalDrivenKm(){
    return this.totalDrivenKm;
  }
  public setName(name: string) {
    this.name = name;
  }
  public setTrips(trip: Trip) {
    this.trips.push(trip);
  }
  public setTotalDrivenKm(drivenKm: number){
    this.totalDrivenKm = drivenKm;
  }




}

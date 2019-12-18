import {Trip} from '../trips/trip.model';

export class ProjectModel{
  private id: number;
  private name: string;
  private trips: [Trip];

  constructor(id: number, name: string, trips: [Trip] ) {
    this.id = id;
    this.name = name;
    this.trips = trips;
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
  public setName(name: string) {
    this.name = name;
  }
  public setTrips(trip: Trip) {
    this.trips.push(trip);
  }




}

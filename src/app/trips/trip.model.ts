export class Trip {
  startLocatie: string;
  eindLocatie: string;
  projectId: number;
  kenteken: string;


  constructor(startLocatie: string, eindLocatie: string, projectId: number, kenteken: string) {
    this.startLocatie = startLocatie;
    this.eindLocatie = eindLocatie;
    this.projectId = projectId;
    this.kenteken = kenteken;
  }
}

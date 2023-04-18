export class Projection{
    projectionId: number;
    name: string;
    description: string;
    genre: string;
    rating: number;

    constructor(projectionId:number, name:string, description:string, genre:string, rating:number){
        this.projectionId = projectionId;
        this.name = name;
        this.description = description;
        this.genre = genre;
        this.rating = rating;
    }
}
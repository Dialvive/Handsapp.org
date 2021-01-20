export class Region{    
    //Attributes 
    ID: number;
    country_id: number;
    name: string;
    modified : Date;

    //Constructor
    constructor(id: number, country_id: number, name: string, modified: Date){
        this.ID = id;
        this.country_id = country_id;
        this.name  = name;
        this.modified = modified;
    }
}
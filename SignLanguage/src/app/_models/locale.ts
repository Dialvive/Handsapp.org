export class Locale{
    
    //Attributes 
    ID: number;
    country_ID: number;
    name: string;
    modified : Date;

    //Constructor
    constructor(ID: number, country_ID: number, name: string, modified: Date){
        this.ID = ID;
        this.country_ID = country_ID;
        this.name = name
        this.modified = modified;
    }

}
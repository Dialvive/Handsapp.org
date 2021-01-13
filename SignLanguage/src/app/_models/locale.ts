export class Locale{
    
    //Attributes 
    id: number;
    country_id: number;
    name: string;
    modified : Date;

    //Constructor
    constructor(id: number, country_id: number, name: string, modified: Date){
        this.id = id;
        this.country_id = country_id;
        this.name = name
        this.modified = modified;
    }

}
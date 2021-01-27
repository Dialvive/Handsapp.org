export class Locale{
    
    //Attributes 
    ID: number;
    country_ID: number;
    spoken_language_ID: number;
    sign_language_ID: number;
    modified : Date;

    //Constructor
    constructor(ID: number, country_ID: number, sign: number, spoken: number, modified: Date){
        this.ID = ID;
        this.country_ID = country_ID;
        this.sign_language_ID = sign;
        this.spoken_language_ID = spoken;
        this.modified = modified;
    }

}
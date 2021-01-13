export class PhraseCategory{
    
    //Attributes 
    id: number;
    country_id: number;
    spoken_language_id: number;
    sign_languages_id: number;
    modified : Date;

    //Constructor
    constructor(id: number, country_id: number, spoken_language_id: number, sign_languages_id: number, modified: Date){
        this.id = id;
        this.country_id = country_id;
        this.spoken_language_id = spoken_language_id;
        this.sign_languages_id = sign_languages_id;
        this.modified = modified;
    }

}
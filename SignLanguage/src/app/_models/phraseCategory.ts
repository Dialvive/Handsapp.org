export class PhraseCategory{
    
    //Attributes 
    ID: number;
    name_de: string;
    name_es : string;
    name_en : string;
    name_fr : string;
    name_it : string;
    name_pt : string;
    modified : Date;

    //Constructor
    constructor(ID: number, de: string, es: string, en: string, fr: string, it: string, pt: string, modified: Date){
        this.ID = ID;
        this.name_de = de;
        this.name_es  = es;
        this.name_en = en;
        this.name_fr = fr;
        this.name_it = it;
        this.name_pt = pt;
        this.modified = modified;
    }

}
export class Phrase{    
    //Attributes 
    ID: number;
    locale_ID: number ;
    phrase_category_ID: number;
    text: String;
    text_de: string;
    text_es: string;
    text_en: string;
    text_fr: string;
    text_it: string;
    text_pt: string;
    context_de: string;
    context_es: string;
    context_en: string;
    context_fr: string;
    context_it: string;
    context_pt: string;
    modified : Date;

    //Constructor
    constructor(id: number, de: string, es: string, en: string, fr: string, it: string, pt: string, cde: string, ces: string, cen: string, cfr: string, cit: string, cpt: string, modified: Date){
        this.ID = id;
        this.text_de = de;
        this.text_es  = es;
        this.text_en = en;
        this.text_fr = fr;
        this.text_it = it;
        this.text_pt = pt;
        this.context_de = cde;
        this.context_es = ces;
        this.context_en = cen;
        this.context_fr = cfr;
        this.context_it = cit;
        this.context_pt = cpt;
        this.modified = modified;
    }
}
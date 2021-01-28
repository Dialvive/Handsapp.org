export class Word{    
    //Attributes 
    ID: number;
    locale_ID: number ;
    word_category_ID: number;
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
    definition_de: string;
    definition_es: string;
    definition_en: string;
    definition_fr: string;
    definition_it: string;
    definition_pt: string;
    modified : Date;

    //Constructor
    constructor(id: number, de: string, es: string, en: string, fr: string, it: string, pt: string, cde: string, ces: string, cen: string, cfr: string, cit: string, cpt: string, dde: string, des: string, den: string, dfr: string, dit: string, dpt: string, modified: Date){
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
        this.definition_de = dde;
        this. definition_es = des;
        this.definition_en = den;
        this.definition_fr = dfr;
        this.definition_it = dit;
        this.definition_pt = dpt;
        this.modified = modified;
    }
}
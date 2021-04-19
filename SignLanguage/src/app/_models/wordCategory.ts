

//WordCategory represents a word category
export class WordCategory {
    ID: number;
    name_de: string;
    name_es: string;
    name_en: string;
    name_fr: string;
    name_it: string;
    name_pt: string;
    modified: string;

    constructor(wordCategory: WordCategory) {
        this.ID = wordCategory.ID;
        this.name_de = wordCategory.name_de;
        this.name_es = wordCategory.name_es;
        this.name_en = wordCategory.name_en;
        this.name_fr = wordCategory.name_fr;
        this.name_it = wordCategory.name_it;
        this.name_pt = wordCategory.name_pt;
        this.modified = wordCategory.modified;
    }

    //Returns a WordCategory as a string array
    public getNames(): string[] {
        return new Array(
            this.name_de,
            this.name_es,
            this.name_en,
            this.name_fr,
            this.name_it,
            this.name_pt
        )
    }

    public getNameByIdiom(lang: any) : string{
        var langAux : number = parseInt(lang);
        switch(langAux) {
            case 0:{
                return this.name_de;
            }
            case 1:{    
                return this.name_es;
            }
            case 2:{
                return this.name_en;
            }
            case 3:{
                return this.name_fr;
            }
            case 4:{
                return this.name_it;    
            }
            case 5:{
                return this.name_pt;   
            }
            default: {
                return this.name_de;
            }
        }
    }
}
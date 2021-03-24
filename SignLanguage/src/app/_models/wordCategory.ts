

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
}
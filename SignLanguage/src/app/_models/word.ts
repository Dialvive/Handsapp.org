
// Word represents a word object
export class Word {
    ID: number;
    word_category_ID: number;
    text_de: string;
    text_en: string;
    text_es: string;
    text_fr: string;
    text_it: string;
    text_pt: string;
    context_de: string;
    context_en: string;
    context_es: string;
    context_fr: string;
    context_it: string;
    context_pt: string;
    definition_de: string;
    definition_en: string;
    definition_es: string;
    definition_fr: string;
    definition_it: string;
    definition_pt: string;
    modified: string;

    constructor(
        word: Word
    ) {
        this.ID = word.ID;
        this.word_category_ID = word.word_category_ID;
        this.text_de = word.text_de;
        this.text_en = word.text_en;
        this.text_es = word.text_es;
        this.text_fr = word.text_fr;
        this.text_it = word.text_it;
        this.text_pt = word.text_pt;
        this.context_de = word.context_de;
        this.context_en = word.context_en;
        this.context_es = word.context_es;
        this.context_fr = word.context_fr;
        this.context_it = word.context_it;
        this.context_pt = word.context_pt;
        this.definition_de = word.definition_de;
        this.definition_en = word.definition_en;
        this.definition_es = word.definition_es;
        this.definition_fr = word.definition_fr;
        this.definition_it = word.definition_it;
        this.definition_pt = word.definition_pt;
        this.modified = word.modified;
    }

    public getID(): number {
        return this.ID
    }

    public getCategory(): number {
        return this.word_category_ID
    }

    public getText(): string[] {
        var texts: string[] = [
            this.text_de,
            this.text_es,
            this.text_en,
            this.text_fr,
            this.text_it,
            this.text_pt
        ];
        return texts;
    }

    public getContext(): string[] {
        var contexts: string[] = [
            this.context_de,
            this.context_es,
            this.context_en,
            this.context_fr,
            this.context_it,
            this.context_pt
        ];
        return contexts;
    }

    public getDefinitions(): string[] {
        var definitions: string[] = [
            this.definition_de,
            this.definition_es,
            this.definition_en,
            this.definition_fr,
            this.definition_it,
            this.definition_pt
        ];
        return definitions;
    }

    public getModified(): string {
        return this.modified
    }

}
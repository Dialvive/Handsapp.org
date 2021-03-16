
//WordSign represents a version of a sign of a word
export class WordSign {
    word_ID: number;
    locale_ID: number;
    version: string;
    region_ID: number;
    modified: string;

	constructor(wordSign: WordSign) {
        this.word_ID = wordSign.word_ID;
        this.locale_ID = wordSign.locale_ID;
        this.version = wordSign.version;
        this.region_ID = wordSign.region_ID;
        this.modified = wordSign.modified;
	}

    public getWordID(): number {
        return this.word_ID;
    }

    public getLocaleID(): number {
        return this.locale_ID;
    }

    public getVersion(): string {
        return this.version;
    }

    public getRegionID(): number {
        return this.region_ID;
    }

    public getModified(): string {
        return this.modified;
    }
    
}
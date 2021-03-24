import { Word } from "./word";

//Search represents a search
export class Search {
    Query:                 string;
    Offset:                number;
    Limit:                 number;
    AttributesToRetrieve:  string | null;
    AttributesToCrop:      string | null;
    CropLength:            number;
    AttributesToHighlight: string | null;
    Filters:               string | null;
    Matches:               boolean;
    FacetsDistribution:    string | null;
    FacetFilters:          string | null;

    constructor (query: string, limit: number) {
        this.Query = query;
        this.Offset = 0;
        this.Limit = limit;
        this.AttributesToRetrieve = null;
        this.AttributesToCrop = null;
        this.CropLength = 200;
        this.AttributesToHighlight = null;
        this.Filters = null;
        this.Matches = false;
        this.FacetsDistribution = null;
        this.FacetFilters = null;
    }

    public getQuery(): string { return this.Query; }
    public setQuery(query: string): void { this.Query = query; }
    public getoffset(): number { return this.Offset; }
    public setoffset(offset: number): void { this.Offset = offset; }
    public getLimit(): number { return this.Limit; }
    public setLimit(limit: number): void { this.Limit = limit; }
    public getAttributesToRetrieve(): string | null { return this.AttributesToRetrieve; }
    public setAttributesToRetrieve(attributes: string | null): void { this.AttributesToRetrieve = attributes; }
    public getAttributesToCrop(): string | null { return this.AttributesToCrop; }
    public setAttributesToCrop(attributes: string | null): void { this.AttributesToCrop = attributes; }
    public getCropLength(): number { return this.CropLength; }
    public setCropLength(value: number): void { this.CropLength = value; }
    public getAttributesToHighlight(): string | null { return this.AttributesToHighlight; }
    public setAttributesToHighlight(value: string | null): void { this.AttributesToHighlight = value; }
    public getFilters(): string | null { return this.Filters; }
    public setFilters(filters: string) { this.Filters = filters; }
    public getMatches(): boolean { return this.Matches; }
    public setMatches(matches: boolean) { this.Matches = matches; }
    public getFacetsDistribution(): string | null { return this.FacetsDistribution; }
    public setFacetsDistribution(value: string | null) { this.FacetsDistribution = value; }
    public getFacetFilters(): string | null { return this.FacetFilters; }
    public setFacetsFilters(value: string | null) { this.FacetFilters = value; }
}

//SearchResult represent what a search result should look like.
interface SearchResult {
    hits: Word[];
    nbHits: number;
    offset: number;
    limit: number;
    processingTimeMs: number;
    query: string;
}

//SearchResult represents a search result
abstract class SearchResult implements SearchResult {

    constructor (result: SearchResult) {
        this.nbHits = result.nbHits;
        this.offset = result.offset;
        this.limit = result.limit;
        this.processingTimeMs = result.processingTimeMs;
        this.query = result.query;
    }

    public abstract getHits(): any[];
    public abstract getNbHits(): number;
    public abstract getOffset(): number;
    public abstract getLimit(): number;
    public abstract getProcessingTimeMs(): number;
    public abstract getQuery(): string;
}

// WordSearchResult represent a search query result for words
export class WordSearchResult extends SearchResult {
    hits: Word[];

    constructor (wordResult: WordSearchResult) {
        super(wordResult);
        this.hits = wordResult.hits;
    }

    public getHits(): Word[] { return this.hits }
    public getNbHits(): number { return this.nbHits; }
    public getOffset(): number { return this.offset; }
    public getLimit(): number { return this.limit; }
    public getProcessingTimeMs(): number { return this.processingTimeMs; }
    public getQuery(): string { return this.query; }
}
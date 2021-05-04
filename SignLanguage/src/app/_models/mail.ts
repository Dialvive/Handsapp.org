//Search represents a search
export class Mail {
    heading:    string;
    content:    string;

    constructor (heading: string, content: string) {
        this.heading = heading;
        this.content = content;
    }

    public setHeading (heading: string):void { this.heading = heading; }
    public setContent (content: string ) { this.content = content; }
    public getHeading (): string { return this.heading; }
    public getContent (): string { return this.content; }

}

export class Mail {
  _subject: string | undefined;
  _replyto: string | undefined;
  body: string | undefined;

  constructor(_subject: string, _replyto: string, body: string) {
    this._subject = _subject;
    this._replyto = _replyto;
    this.body = body;
  }
}

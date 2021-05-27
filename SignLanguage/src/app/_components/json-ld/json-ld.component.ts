import { ChangeDetectionStrategy, HostBinding, Input, Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-json-ld',
  templateUrl: './json-ld.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonLdComponent {

  @Input()
  set json(currentValue: any) {
  this.jsonLD = this.getSafeHTML(currentValue);
  }
  @HostBinding('innerHTML') jsonLD?: SafeHtml;
  constructor(
    private sanitizer: DomSanitizer
  ) { }
  
  getSafeHTML(value: {}) {
  let json = value
  ? JSON.stringify(value, null, 2).replace('/</script>/g', '<\/script>') : '';
  
  if (environment.production) {
    json = JSON.stringify(JSON.parse(json));
  }
  
  const html = `<script type="application/ld+json">${json}</script>`;
  return this.sanitizer.bypassSecurityTrustHtml(html);
  
  }
}

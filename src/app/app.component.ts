import { Component, HostListener, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'KeyboardEvent_Info';

  evtList: KeyboardEvent[] = [];

  @HostListener('window:keydown', ['$event']) onKeydown(evt: KeyboardEvent) {
    console.log(evt);
    this.evtList.push(evt);
    if (this.evtList.length > 1000) this.evtList.shift();
  }
}


@Pipe({
  name: 'evtFormat'
})
export class EvtFormatPipe implements PipeTransform {

  keys = ['isTrusted', 'key', 'code', 'location', 'ctrlKey', 'keyCode'];

  constructor(private sanitizer: DomSanitizer) { }

  transform(evt: KeyboardEvent) {
    let res = '{ ';
    this.keys.map(key => {
      res += `<span style="color: #8f8f8f">${key}</span>: `;
      // @ts-ignore
      const value = evt[key];
      if (typeof value === 'string') res += `<span style="color: #dd362e">'${value}'</span>, `;
      else if (typeof value === 'number' || typeof value === 'boolean') res += `<span style="color: #1342a0">${value}</span>, `;
    });
    res += ' ...}';
    return this.sanitizer.bypassSecurityTrustHtml(res) || '';;
  }
}
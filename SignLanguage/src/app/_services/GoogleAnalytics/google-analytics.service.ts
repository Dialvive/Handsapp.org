import { Injectable } from '@angular/core';

declare let gtag: (property: string, value: any, configs: any) => {};

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() { }

  public eventEmitter( 
    eventName: string, 
    eventCategory: string, 
    eventAction: string, 
    eventLabel: string | null = null,  
    eventValue: number | null = null )
    { 
      gtag('event', eventName, { 
              eventCategory: eventCategory, 
              eventLabel: eventLabel, 
              eventAction: eventAction, 
              eventValue: eventValue
            })
    }
}

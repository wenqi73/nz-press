import { Injectable } from '@angular/core';
import config from '../../assets/config';

@Injectable({ providedIn: 'root' })
export class ConfigService {

  constructor() { }

  /**
   * find language through url
   * @param url 
   */
  findLanguage(url: string) {
    // first
    const flg = url.match(/\/?([^\/]+)\//);
    const language = flg ? flg[1] : '';
    return Object.keys(config.locales).findIndex(l => `/${language}/` === l) > -1 ? language : '';
  }
}
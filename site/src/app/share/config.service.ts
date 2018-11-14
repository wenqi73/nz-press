import { Injectable } from '@angular/core';
import config from '../../assets/config';
import { Subject } from 'rxjs';

export interface Language {
  name: string;
  text: string;
}

interface Config {
  title: string;
  description: string;
  lang?: string;
  language: string;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  language: Language;
  languages: Language[];
  languageChange$: Subject<Config> = new Subject();
  private _langs: Language[] = [
    { name: '', text: 'English' },
    { name: 'zh', text: '中文' }
  ];

  constructor() {
    const locales = config.locales || config;
    // filter _langs
    this.languages = this._langs.filter(
      lang => Object.keys(locales).includes(`/${lang.name}`)
    );
  }

  change() {
    let languageConfig;
    try {
      languageConfig = config.locales[`/${this.language.name}`];
    } catch(err) {
      languageConfig = config;
    }
    const { title, description, lang } = languageConfig;
    this.languageChange$.next(
      { title, description, lang, language: this.language.name }
    );
  }

  /**
   * find language through url
   * @param url 
   */
  getLangByUrl(url: string): Language {
    // first
    const flg = url.match(/\/?([^\/]+)\//);
    const language = flg ? flg[1] : '';
    this.language = this.languages.find(l => language === l.name);
    return this.language;
  }
}
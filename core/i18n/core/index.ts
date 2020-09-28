/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { ILang, IBaseLang } from './core';
export * from './core';

import Config from '@/config/default/i18n';

type IAllLang = ILang & IBaseLang;

let languageMap: { [index: string]: [string, ILang] } = {};
export const defaultLanguage: string = Config.defaultLang || 'en-US';

export function RegisterLanguage(name: string, description: string) {
    return (Class: any) => {
        languageMap[name] = [description, new Class()];
    };
}

let languageBaseMap: { [index: string]: [string, IBaseLang] } = {};
export function RegisterBaseLanguage(name: string, description: string) {
    return (Class: any) => {
        languageBaseMap[name] = [description, new Class()];
    };
}

export class Language {
    /// get all languages
    list(): { [index: string]: string } {
        return Object.keys(languageMap).reduce(
            (final, key) => {
                final[key] = languageMap[key][0];
                return final;
            },
            {} as any,
        );
    }
    translate<T extends keyof IAllLang>(key: T, data?: { [index: string]: any }): IAllLang[T] {
        let akey: any = key;
        let result =
            this.getLanguageObject()[akey] ||
            this.getLanguageBaseObject()[akey] ||
            `(!) ${this.getLanguageObject(defaultLanguage)[akey] || this.getLanguageBaseObject(defaultLanguage)[akey] || key}`;
        /// replace token
        if (data)
            for (let o in data) {
                result = result.replace(new RegExp(`\\{${o}\\}`, 'g'), data[o]);
            }
        return result;
    }

    /// getter / getter of current language
    set(name: string) {
        if (!name) return;
        if (Object.keys(languageMap).indexOf(name) >= 0) this.currentLanguage.next(name);
        else throw `Language <${name}> not exists.`;
    }
    get(): string {
        return this.currentLanguage.getValue();
    }

    getObservable(): Observable<string> {
        return this.currentLanguage.asObservable();
    }

    /// private helpers
    private currentLanguage: BehaviorSubject<string> = new BehaviorSubject<string>(defaultLanguage);
    private getLanguageObject(name?: string): ILang {
        return !name ? languageMap[this.currentLanguage.getValue()][1] : languageMap[name][1];
    }
    private getLanguageBaseObject(name?: string): IBaseLang {
        return !name ? languageBaseMap[this.currentLanguage.getValue()][1] : languageBaseMap[name][1];
    }
}

const lang = new Language();
export default lang;

declare module 'vue/types/vue' {
    export interface Vue {
        _<T extends keyof IAllLang>(key: T, data?: { [index: string]: any }): IAllLang[T];
    }
}

export const LangPlugin = {
    install: function(Vue: any) {
        if (Vue._isap_lang_installed) return;
        Vue._isap_lang_installed = true;

        Vue.mixin({
            created() {
                let subscription = lang.getObservable().subscribe((name) => {
                    this.$forceUpdate();
                });
                this.$once('hook:beforeDestroy', () => subscription.unsubscribe());
            },

            methods: {
                _: LangCache(
                    <T extends keyof IAllLang>(key: T, data?: { [index: string]: any }): IAllLang[T] => {
                        return lang.translate(key, data);
                    },
                ),
            },
        });
    },
};

const cachedLang: any = {};
function LangCache<T extends Function>(wrapped: T): T {
    return (function() {
        let curLang = lang.get();
        let [key, data] = arguments;
        let dataString = data ? JSON.stringify(data) : '';
        let cached = (!cachedLang[curLang] && (cachedLang[curLang] = {}), cachedLang[curLang]);
        cached = (!cached[key] && (cached[key] = {}), cached[key]);
        cached = cached[dataString];
        if (cached) return cached;

        let value = wrapped(...arguments);
        cachedLang[curLang][key][dataString] = value;
        return value;
    } as any) as T;
}

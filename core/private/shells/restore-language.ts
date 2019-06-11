import Server from '@/config/default/server';
import { ModalResponse } from '@/../components/modal/modal-response';
import lang from './../../i18n/core';
import data from '@/package.json';
const kLang = `${data.name}:lang`;

/// restore language
let storedLanguage = localStorage.getItem(kLang);
storedLanguage && lang.set(storedLanguage);

/// save language
lang.getObservable().subscribe( (lang) => {
    localStorage.setItem(kLang, lang);
});

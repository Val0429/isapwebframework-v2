import Server from '@/config/default/server';
import { ModalResponse } from '@/../components/modal/modal-response';
import lang from './../../i18n/core';

/// restore language
let storedLanguage = localStorage.getItem("lang");
storedLanguage && lang.set(storedLanguage);

/// save language
lang.getObservable().subscribe( (lang) => {
    localStorage.setItem("lang", lang);
});

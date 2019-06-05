import LangBaseObject from './../en-US';
import LangObject from '@/assets/i18n/en-US';

export type ClassToInterface<T> = {
    [P in keyof T]: T[P];
}

export type IBaseLang = ClassToInterface<LangBaseObject>;
export type ILang = ClassToInterface<LangObject>;
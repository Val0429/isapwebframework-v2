/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import LangBaseObject from './../en-US';
import LangObject from '@/assets/i18n/en-US';

export type ClassToInterface<T> = {
    [P in keyof T]: T[P];
}

export type IBaseLang = ClassToInterface<LangBaseObject>;
export type ILang = ClassToInterface<LangObject>;
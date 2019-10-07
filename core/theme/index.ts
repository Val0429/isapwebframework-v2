/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import Vue from 'vue';

interface IThemeUnit {
    key: string;
    name: string;
    element: typeof Vue;
}

let themeMap: {
    [index: string]: IThemeUnit
} = {};

export function RegisterTheme(key: string, name: string) {
    return (element: any) => {
        themeMap[key] = {
            key,
            name,
            element
        }
    }
}

export function RetrieveTheme(element: typeof Vue): IThemeUnit {
    for (let theme in themeMap) {
        let themeUnit = themeMap[theme];
        if (themeUnit.element === element) return themeUnit;
    }
    return;
}

export class Theme {
    static list(): { [index: string]: IThemeUnit } {
        return themeMap;
    }
}

/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

type Input = {
    [index: string]: string;
}

export function toEnumInterface(input: Input, isArray?: boolean): string {
    let tmpary: string[] = Object.keys(input).map( (key) => {
        let isNumeric = /^[0-9]+$/.test(key);
        return isNumeric ? `'${input[key]}' = ${key},` :
            `'${input[key]}' = '${key}',`;
    });
    return `${isArray?'(':''}enum {
            ${tmpary.join("\r\n")}
        }${isArray?')[]':''};`;
}
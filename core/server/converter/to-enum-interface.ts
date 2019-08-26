/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

type Input = {
    [index: string]: string;
}

export function toEnumInterface(input: Input, isArray?: boolean): string {
    let doReplaceQuote = (input) => {
        return input.replace(/(['"])/g, (a, b) => `\\${b}`);
    };

    let tmpary: string[] = Object.keys(input).map( (key) => {
        let isNumeric = /^[0-9]+$/.test(key);
        let tValue = doReplaceQuote(input[key]);
        let tKey = doReplaceQuote(key);
        return isNumeric ? `'${tValue}' = ${tKey},` :
            `'${tValue}' = '${tKey}',`;
    });

    return `${isArray?'(':''}enum {
            ${tmpary.join("\r\n")}
        }${isArray?')[]':''};`;
}
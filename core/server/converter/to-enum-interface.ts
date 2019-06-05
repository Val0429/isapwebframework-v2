type Input = {
    [index: string]: string;
}

export function toEnumInterface(input: Input, isArray?: boolean): string {
    let tmpary: string[] = Object.keys(input).map( (key) => {
        return `'${input[key]}' = '${key}',`;
    });
    return `${isArray?'(':''}enum {
            ${tmpary.join("\r\n")}
        }${isArray?')[]':''};`;
}
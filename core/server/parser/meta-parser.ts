export interface IMetaAttrs {
    //uiHidden?: boolean;
    [index: string]: any;
}

export interface IMetaResult {
    name: string;
    type: string | MetaParser;
    optional: boolean;
    /// location of this meta. default start with 0.
    index: number;                                                 
    attrs?: IMetaAttrs;
}

export interface IEnumMetaResult {
    id: string;
    text: string;
    attrs?: IMetaAttrs;
}
export class EnumParser {
    result: IEnumMetaResult[] = [];
    constructor(meta: string, name?: string) {
        let inf = this.getEnumByName(meta, name);
        if (!inf) return;
        this.parseEnumInnerString(inf);
    }
    private getEnumByName(meta: string, name?: string): string | undefined {
        !name && (name = "[^{]*");
        let minfstart = meta.match( new RegExp(`enum\\s+${name}(?:<[^>]+>)?\\s*{`) );
        if (!minfstart) return;
        let infstart = (minfstart.index||0)+minfstart[0].length;
        let infend; for (var i=infstart; i<meta.length ;++i) { if (meta[i] === '}') {infend = ++i; break;} }
        return meta.substring(infstart, infend);
    }
    private parseEnumInnerString(meta: string) {
        let o = meta;
        let result: IEnumMetaResult | undefined;
        let createResult = () => result = { id: '', text: '' };
        createResult();

        /// take properties one by one
        for (let i=0; i<o.length; ++i) {
            if (!result) createResult();
            /// 1) match `/*` or alphabet
            let letter = o[i];
            if (letter === '/') {
                /// 1.1) matched `/`
                if (o[++i] !== '*') continue;
                /// 1.2) take until `*/`
                let startpoint = ++i;
                result!.attrs = {};
                for (; i<o.length; ++i) {
                    letter = o[i];
                    if (letter === '*' && o[i+1] === '/') {
                        /// 1.3) matched. take out comment
                        let comment = o.substring(startpoint, i);
                        /// 1.4) parse comment
                        comment.replace(/@([a-z0-9_-]+) \- (.*)/gi, (a,b,c) => {
                            (result!.attrs! as any)[b] = c;
                            return '';
                        });
                        break;
                    }
                }

            } else if (/[a-z0-9'"]/i.test(letter) || /[^\u0000-\u00ff]/.test(letter)) {
            /// 2) matched alphabet
                let declaration = o.substring(i, o.length);
                /// for pure interface
                let matches = declaration.match(/([^=]+)(\?)?[\s\t]*=[\s\t]*([^,]+)/i);
                /// remove comma
                let mchs = matches![1].match(/['"]?([^'"]+)['"]?/);
                result!.text = mchs && mchs.length > 1 ? mchs[1] : matches![1];
                mchs = matches![3].match(/['"]?([^'"]+)['"]?/);
                result!.id = mchs && mchs.length > 1 ? mchs[1] : matches![3];
                this.result.push(result!);
                i += (matches![0].length +1);
                result = undefined;
            }
        }
    }
}

export class MetaParser {
    result: IMetaResult[] = [];

    constructor(meta: string, name?: string) {
        if (name === undefined)
            this.parseMeta(meta);
        else {
            let infstr = this.getInterfaceByName(meta, name);
            if (!infstr) return;
            this.parseInputInterfaceInnerString(infstr);
        }
    }

    private parseMeta(meta: string) {
        let inputInterfaceInnerString = this.getInputInterfaceInnerString(meta);
        if (!inputInterfaceInnerString) return;
        this.parseInputInterfaceInnerString(inputInterfaceInnerString);
    }

    private getInterfaceByName(meta: string, name?: string): string | undefined {
        !name && (name = "[^{]*");
        let minfstart = meta.match( new RegExp(`interface\\s+${name}(?:<[^>]+>)?\\s*{`) );
        if (!minfstart) return;
        let infstart = (minfstart.index||0)+minfstart[0].length;
        let infend;
        let prec = 0;
        for (var i=infstart; i<meta.length ;++i) {
            if (meta[i] === '{') ++prec;
            if (meta[i] === '}') { --prec; if (prec>=0) continue; infend = ++i; break;}
        }
        return meta.substring(infstart, infend);
    }

    private getInputInterfaceInnerString(meta: string): string | undefined {
        /// parse meta
        let m1 = meta.match(/Input Interface\:[\W]+/);
        let m2 = meta.match(/[\r\n\s]+Output Interface\:[\W]+/);
        let m1pos = m1 ? m1[0].length : 0;
        let m2pos = m2 ? m2.index : meta.length;
        let input = meta.substring(m1pos, m2pos);
        /// 1) fetch Restful for match interface
        let minf = input.match(/Restful.InputR<([^>]+)>/);
        /// 1.1) ignore not Restful for now
        if (!minf) return;
        let inf = minf[1];
        return this.getInterfaceByName(inf);
        // let minfstart = input.match( new RegExp(`interface\\s+${inf}(?:<[^>]+>)?\\s*{`) );
        // if (!minfstart) return;
        // let infstart = (minfstart.index||0)+minfstart[0].length;
        // let infend; for (var i=infstart; i<input.length ;++i) { if (input[i] === '}') {infend = i; break;} }
        // return input.substring(infstart, infend);
    }

    private parseInputInterfaceInnerString(interfaceInnerString: string) {
        let o = interfaceInnerString;
        let result: IMetaResult | undefined;
        let createResult = () => result = { name: '', type: '', optional: false, index: 0 };
        createResult();

        /// take properties one by one
        for (let i=0; i<o.length; ++i) {
            if (!result) createResult();
            /// 1) match `/*` or alphabet
            let letter = o[i];
            if (letter === '/') {
                /// 1.1) matched `/`
                if (o[++i] !== '*') continue;
                /// 1.2) take until `*/`
                let startpoint = ++i;
                result!.attrs = {};
                for (; i<o.length; ++i) {
                    letter = o[i];
                    if (letter === '*' && o[i+1] === '/') {
                        /// 1.3) matched. take out comment
                        let comment = o.substring(startpoint, i);
                        /// 1.4) parse comment
                        comment.replace(/@([a-z0-9_-]+) \- (.*)/gi, (a,b,c) => {
                            (result!.attrs! as any)[b] = c;
                            return '';
                        });                        
                        break;
                    }
                }

            } else if (letter.toLowerCase() !== letter.toUpperCase()) {
            /// 2) matched alphabet
                let declaration = o.substring(i, o.length);
                /// for pure interface
                // let matches = declaration.match(/([a-z0-9]+)(\?)?[\s\t]*:[\s\t]*([^;]+)/i);
                // result!.name = matches![1];
                // result!.optional = matches![2] ? true : false;
                // result!.type = matches![3];
                // i += (matches![0].length +1);

                /// new: match type with ;
                let matches = declaration.match(/([a-z0-9_]+)(\?)?[\s\t]*:[\s\t]*/i);
                result!.name = matches![1];
                result!.optional = matches![2] ? true : false;
                i += (matches![0].length);
                let startpoint = i;
                let bracets = 0;
                for (; i<o.length; ++i) {
                    letter = o[i];
                    if (letter === '{') {
                        bracets++;
                    } else if (letter === '}') {
                        bracets--;
                    } else if (letter === ';' && bracets === 0) {
                        let type = o.substring(startpoint, i);
                        if (/^interface /.test(type)) {
                            result!.type = new MetaParser(type, null);
                        } else {
                            result!.type = type;
                        }
                        break;
                    }
                }

                result!.index = this.result.length;
                this.result.push(result!);

                result = undefined;
            }
        }
  
    }
}
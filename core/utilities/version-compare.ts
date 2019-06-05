/// return number
/// 1:  b > a
/// 0:  b = a
/// -1: b < a
export function versionCompare(a: string, b: string): number {
    let mapping = (v): number => {
        let matches = v.match(/[0-9]+/);
        return matches.length > 0 ? +matches[0] : 0;
    }
    let ar = a.split(".").map(mapping);
    let br = b.split(".").map(mapping);

    for (let i=0; i<Math.max(ar.length, br.length); ++i) {
        let anum = ar[i] || 0;
        let bnum = br[i] || 0;
        if (bnum > anum) return 1;
        else if (bnum < anum) return -1;
    }
    return 0;
}
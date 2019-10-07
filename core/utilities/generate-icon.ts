export function generateIcon(icon: string) {
    let classes = ['fa', 'isap-toolbox-icon'];
    if (/^isap/.test(icon)) ['isap-icon'].forEach( v => classes.push(v) );
    classes.push(icon);
    return classes.join(" ");
}
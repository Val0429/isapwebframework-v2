export function generateIcon(icon: string) {
    let classes = [];
    if (/^fa/.test(icon)) classes.push("fa");
    if (/^isap/.test(icon)) classes.push("isap-icon");
    classes.push(icon);
    return classes.join(" ");

    // let classes = ['fa', 'isap-toolbox-icon'];
    // if (/^isap/.test(icon)) ['isap-icon'].forEach( v => classes.push(v) );
    // classes.push(icon);
    // return classes.join(" ");
}
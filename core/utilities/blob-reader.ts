interface Blob {
    toString(): Promise<string>;
    toBase64(): Promise<string>;
}

Blob.prototype.toString = async function(): Promise<string> {
    let reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (e) => reject(e);
        reader.readAsText(this);
    });
}

Blob.prototype.toBase64 = async function(): Promise<string> {
    let reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(this);
    });
}
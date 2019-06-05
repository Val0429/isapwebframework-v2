const _format: string = 'border:solid 2px {Border}; background:{Back}; color:{Font}; border-radius:3px; font-size:14px; font-weight:900; padding:1px 6px;';

/**
 * Print color
 */
export enum Color {
    black = '#000000',
    red = '#ff0000',
    green = '#00ff00',
    yellow = '#ffff00',
    blue = '#0000ff',
    magenta = '#ff00ff',
    cyan = '#00ffff',
    white = '#ffffff',
}

/**
 * Style interface
 */
export interface IStyle {
    back: Color | string;
    font: Color | string;
    border: Color | string;
}

/**
 * Default style
 */
export let Style: { [style: string]: IStyle } = {
    error: { back: '#f9cdd3', font: '#b53f45', border: '#b53f45' },
    info: { back: '#c8ebfa', font: '#3fc3ee', border: '#3fc3ee' },
    ok: { back: '#c2fc80', font: '#478500', border: '#478500' },
    warning: { back: '#fbeccb', font: '#f3a623', border: '#f3a623' },
    success: { back: '#c7ffec', font: '#40b576', border: '#40b576' },
    message: { back: '#999999', font: '#444444', border: '#444444' },
};

/**
 * Print format message
 * @param title
 * @param message
 * @param style
 */
export function Message(title: string, message: any, type: 'error' | 'info' | 'ok' | 'warning' | 'success' | 'message' = 'message'): void {
    title = title.length === 0 ? ' ' : title;

    console.log(
        `%c${title}`,
        _format
            .replace(/{Border}/g, Style[type].border)
            .replace(/{Back}/g, Style[type].back)
            .replace(/{Font}/g, Style[type].font),
        message,
    );
}

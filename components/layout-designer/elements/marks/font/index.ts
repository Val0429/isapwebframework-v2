import { Mark } from 'tiptap';
import { toggleMark, updateMark } from 'tiptap-commands';

export class Font extends Mark {
    get name() {
        return 'font';
    }

    get schema() {
        return {
            attrs: {
                'font-family': {
                    // default: '微軟正黑體'
                    default: undefined
                },
                'font-size': {
                    // default: '20'
                    default: undefined
                }
            },
            parseDOM: [
                {
                    style: 'font-family',
                    getAttrs: value => ({
                        'font-family': value
                    })
                },
                {
                    style: 'font-size',
                    getAttrs: value => ({
                        'font-size': value
                    })
                }
            ],
            toDOM: (node) => {
                return ['span', {
                    style: `font-family: '${node.attrs['font-family']||'inherit'}'; font-size: ${node.attrs['font-size'] ? node.attrs['font-size']+'px' : 'inherit'}`
                }, 0];
            }
        }
    }

    commands({ type }) {
        return (attrs) => updateMark(type, attrs);
    }
}
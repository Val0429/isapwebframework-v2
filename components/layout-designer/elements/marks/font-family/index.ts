import { Mark } from 'tiptap';
import { toggleMark, updateMark } from 'tiptap-commands';

export class FontFamily extends Mark {
    get name() {
        return 'fontfamily';
    }

    get schema() {
        return {
            attrs: {
                'font-family': {
                    default: '微軟正黑體'
                }
            },
            parseDOM: [
                {
                    style: 'font-family',
                    getAttrs: value => ({
                        'font-family': value
                    })
                }
            ],
            toDOM: (node) => {
                return ['span', {
                    style: `font-family: '${node.attrs['font-family']}'; font-size: inherit`
                }, 0];
            }
        }
    }

    commands({ type }) {
        return (attrs) => updateMark(type, attrs);
    }
}
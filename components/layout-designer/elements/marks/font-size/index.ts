import { Mark } from 'tiptap';
import { toggleMark, updateMark } from 'tiptap-commands';

export class FontSize extends Mark {
    get name() {
        return 'fontsize';
    }

    get schema() {
        return {
            attrs: {
                'font-size': {
                    default: "20"
                }
            },
            parseDOM: [
                {
                    style: 'font-size',
                    getAttrs: value => ({
                        'font-size': value
                    })
                }
            ],
            toDOM: (node) => {
                return ['span', {
                    style: `font-size: ${node.attrs['font-size']}px; font-family: inherit`
                }, 0];
            }
        }
    }

    commands({ type }) {
        return (attrs) => updateMark(type, attrs);
    }
}
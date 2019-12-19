import { Mark } from 'tiptap';
import { toggleMark, updateMark } from 'tiptap-commands';

export class Font extends Mark {
    get name() {
        return 'font';
    }

    get schema() {
        return {
            inclusive: true,
            attrs: {
                'font-family': {
                    // default: '微軟正黑體'
                    default: undefined
                },
                'font-size': {
                    // default: '20'
                    default: undefined
                },
                'color': {
                    // default: '#000',
                    default: undefined
                }
            },
            parseDOM: [
                {
                    tag: '*[style*="font-family"], *[style*="font-size"], *[style*="color"]',
                    getAttrs: (value) => {
                        let fontFamily = value.style['font-family'];
                        let fontSize = value.style['font-size'];
                        let color = value.style['color'];

                        if (!fontFamily && !fontSize && !color) return false;

                        const normalizeFontFamily = () => {
                            var regex = /(^\")|(\"$)/g;
                            return fontFamily.replace(regex, "");
                        }
                        const normalizeFontSize = () => {
                            var regex = /px$/;
                            return fontSize.replace(regex, "");
                        }

                        return {
                            'font-family': fontFamily ? normalizeFontFamily() : 'inherit',
                            'font-size': fontSize ? normalizeFontSize() : 'inherit',
                            'color': color || 'inherit'
                        };
                    }
                },
                // {
                //     style: 'font-family',
                //     getAttrs: value => {
                //         return {
                //             'font-family': value
                //         };
                //     }
                // },
                // {
                //     style: 'font-size',
                //     getAttrs: value => {
                //         console.log('...2', value);
                //         return {
                //             'font-size': value
                //         }
                //     }
                // },
                // {
                //     style: 'color',
                //     getAttrs: value => ({
                //         'color': value
                //     })
                // }
            ],
            toDOM: (node) => {
                console.log('hello', node.attrs)
                return ['span', {
                    style: `font-family: ${node.attrs['font-family'] ? "'"+node.attrs['font-family']+"'" : 'inherit'}; font-size: ${node.attrs['font-size'] ? node.attrs['font-size']+'px' : 'inherit'}; color: ${node.attrs['color']||'inherit'};`
                }, 0];
            }
        }
    }

    commands({ type }) {
        return (attrs) => updateMark(type, attrs);
    }
}
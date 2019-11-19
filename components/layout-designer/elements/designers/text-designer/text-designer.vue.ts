/*
 * Created on Tue Nov 18 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";
import { generateIcon } from "@/../core/utilities";

import { Editor, EditorContent, EditorMenuBar, Node } from 'tiptap';
import { toggleMark, toggleWrap, wrappingInputRule, markInputRule, markPasteRule } from 'tiptap-commands';
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions';

@Component({
    components: { EditorContent, EditorMenuBar }
})
export class TextDesigner extends Vue {
    @Prop({
        type: String, required: false
    })
    value: string;

    /// private helper
    @Watch("value", { immediate: true })
    onValueChanged(newval: string) {
        console.log('content change!', newval);
        this.editor.setContent(newval, true);
    }

    /// init
    private editor = new Editor({
        extensions: [
            new Bold(),
            new Italic(),
            new Underline(),
            new Heading({ labels: [1,2,3] })
        ]
    });

    /// recycle
    private beforeDestroy() {
        this.editor.destroy();
    }
}
export default TextDesigner;

export class IFrameNode extends Node {
    get name() {
        return 'iframe';
    }
    get schema() {
        return {
            attrs: {
                src: {
                    default: null
                }
            },
            group: "block",
            selectable: false,
            parseDOM: [{
                tag: 'iframe',
                getAttrs: dom => ({
                    src: dom.getAttribute('src')
                })
            }],
            toDOM: node => ['iframe', {
                src: node.attrs.src,
                frameborder: 0,
                allowfullscreen: true
            }]
        }
    }

    commands({ type }) {
        return (attrs) => (state, dispatch) => {
            const { selection } = state;
            const position = selection.$cursor ?
                selection.$cursor.pos :
                selection.$to.pos;
            const node = type.create(attrs);
            const transaction = state.tr.insert(position, node);
            dispatch(transaction);
        }
    }

    get view() {
        return {
            props: ['node', 'updateAttrs', 'view'],
            computed: {
                src: {
                    get() {
                        return this.node.attrs.src
                    },
                    set(src) {
                        this.updateAttrs({ src });
                    }
                }
            },
            template: `
            <div class="iframe">
                <iframe class="iframe__embed" :src="src"></iframe>
                <input class="iframe__input" type="text" v-model="src" v-if="view.editable" />
            </div>
            `
        }
    }
}

export class TextDesignerNode extends Node {
    get name() {
        return "tdn";
    }
    get schema() {
        return {
            content: "block+",
            group: "block",
            defining: true,
            draggable: false,
            parseDOM: [
                { tag: 'blockquote' }
            ],
            toDOM: () => ['blockquote', {class: 'awesome-blockquote'}, 0]
        }
    }
    commands({ type, schema }) {
        return () => toggleWrap(type);
    }
    keys({ type }) {
        return {
            'Ctrl->': toggleWrap(type)
        }
    }
    inputRule({ type }) {
        return [
            wrappingInputRule(/^\s*>\s$/, type)
        ]
    }
}

// export class TextDesignerNode extends Node {
//     get name() {
//         return 'text-designer-node';
//     }
//     get schema() {
//         return {
//             attrs: {
//                 html: {
//                     default: null
//                 }
//             },
//             group: "block",
//             selectable: true,
//             parseDOM: [{
//                 tag: 'text-designer-node',
//                 getAttrs: dom => ({
//                     html: dom.innerHTML
//                 })
//             }],
//             toDOM: node => ['text-designer-node', {
//             }, node.html]
//         }
//     }

//     commands({ type }) {
//         return () => toggleMark(type);
//     }

//     inputRules({ type }) {
//         return [
//           markInputRule(/(?:\*\*|__)([^*_]+)(?:\*\*|__)$/, type),
//         ]
//     }
    
//     pasteRules({ type }) {
//         return [
//           markPasteRule(/(?:\*\*|__)([^*_]+)(?:\*\*|__)/g, type),
//         ]
//     }

//     get view() {
//         return {
//             props: ['node', 'updateAttrs', 'view'],
//             template: `
//             <div>Hello!</div>
//             `
//         }
//     }
// }


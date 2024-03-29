/*
 * Created on Tue Nov 18 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";

import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
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
  Placeholder
} from 'tiptap-extensions';
import { TextDesigner, Font } from './../elements';

@Component({
    components: { EditorContent, EditorMenuBar }
})
export class LayoutDesigner extends Vue {
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
            new TextDesigner(),
            new Bold(),
            new Heading({ labels: [1,2,3] }),
            new Font()
            // new Placeholder({
            //     emptyNodeClass: "is-empty",
            //     emptyNodeText: "Write something...",
            //     showOnlyWhenEditable: true,
            // })
        ],
        onUpdate: ({getJSON, getHTML}) => {
            console.log('updated!', getHTML());
        },
        editorProps: {
            handlePaste: (view, event, slice) => {
                console.log('paste!', event, slice);
            }
        }
    });

    /// recycle
    private beforeDestroy() {
        this.editor.destroy();
    }
}
export default LayoutDesigner;
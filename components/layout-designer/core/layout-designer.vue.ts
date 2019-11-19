/*
 * Created on Tue Nov 18 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";
import { generateIcon } from "@/../core/utilities";

// import { schema } from 'prosemirror-schema-basic';
// import { DOMParser, Schema } from 'prosemirror-model';
// import { EditorState, Plugin } from "prosemirror-state";
// import { EditorView } from "prosemirror-view";
// import { undo, redo, history } from "prosemirror-history";
// import { keymap } from "prosemirror-keymap";
// import { baseKeymap } from "prosemirror-commands";
// import { exampleSetup } from "prosemirror-example-setup";

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
} from 'tiptap-extensions';
import { TextDesignerNode, IFrameNode } from './../elements';

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
            new Bold(),
            new Italic(),
            new Underline(),
            new Heading({ labels: [1,2,3] }),
            new History(),

            new TextDesignerNode(),
            new IFrameNode()
        ],
        onUpdate: ({getJSON, getHTML}) => {
            console.log('updated!', getHTML());
        }
    });

    /// recycle
    private beforeDestroy() {
        this.editor.destroy();
    }

    private log() {
        console.log('log!', ...arguments);
    }
}
export default LayoutDesigner;
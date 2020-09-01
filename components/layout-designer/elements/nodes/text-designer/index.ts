/*
 * Created on Tue Nov 18 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";
import { generateIcon } from "@/../core/utilities";

import { Editor, EditorContent, EditorMenuBar, Node } from 'tiptap';
import { toggleMark, toggleWrap, wrappingInputRule, markInputRule, markPasteRule } from 'tiptap-commands';

export class TextDesigner extends Node {
    get name() {
        return 'iv-text-designer';
    }
    get schema() {
        return {
            content: "block+",
            group: "block",
            defining: true,
            isolating: true,
            draggable: false,
            parseDOM: [{
                tag: 'div[iv-text-designer]'
            }],
            toDOM: node => ['div', {
                style: "border: 1px solid black; background: red; position: absolute",
                'iv-text-designer': true
            }, 0]
        }
    }

    commands({ type }) {
        return () => toggleWrap(type);
    }
}

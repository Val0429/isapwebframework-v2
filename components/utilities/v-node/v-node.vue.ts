import { Vue, Component, Prop, Model, Emit, Watch, Inject } from "vue-property-decorator";

@Component
export class VNode extends Vue {
    @Prop({ required: true })
    node: VNode | Function;

    render(h) {
        let node = typeof this.node === 'function' ? this.node() : this.node;
        return h('div', node);
    }

    findElement(element: typeof Vue) {
        return this.$children.reduce( (final, node) => {
            if (final) return final;
            if (node instanceof element) return node;
        }, undefined);
    }
}
export default VNode;
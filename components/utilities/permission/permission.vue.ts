import { Vue, Component, Prop, Model, Emit, Watch, Inject } from "vue-property-decorator";

@Component
export class Permission extends Vue {
    @Prop({ type: [String, Array], required: false, default: null })
    allow: string | string[];

    @Prop({ type: [String, Array], required: false, default: null })
    deny: string | string[];

    private get isAllowed(): boolean {
        let roles = ((this.$user.user || {}).roles || []).map( value => value.name );
        if (roles.length === 0) return false;
        if (this.allow) {
            let allow = Array.isArray(this.allow) ? this.allow : [this.allow];
            if ( allow.filter(val => roles.includes(val)).length > 0 ) return true;
            return false;
        }
        if (this.deny) {
            let deny = Array.isArray(this.deny) ? this.deny : [this.deny];
            if ( deny.filter(val => roles.includes(val)).length > 0 ) return false;
            return true;
        }
        return true;
    }
}
export default Permission;
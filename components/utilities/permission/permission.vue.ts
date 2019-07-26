import { Vue, Component, Prop, Model, Emit, Watch, Inject } from "vue-property-decorator";

@Component
export class Permission extends Vue {
    @Prop({ type: String, required: false, default: null })
    url: string | string[];

    @Prop({ type: [String, Array], required: false, default: null })
    allow: string | string[];

    @Prop({ type: [String, Array], required: false, default: null })
    deny: string | string[];

    private isAllowed(): boolean {
        /// url check
        if (this.url) {
            let url = Array.isArray(this.url) ? this.url : [this.url];
            return url.reduce<boolean>((final, value) => {
                if (!final || !(this.$permissions[value] || {})['Get']) return false;
                return final;
            }, true);
        }

        /// role check
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
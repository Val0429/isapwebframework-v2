/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Emit, Watch, Inject } from "vue-property-decorator";
import { FindRouter } from '@/../core/router';

@Component
export class RouteTransition extends Vue {
    /// public ///////////////////////////////////////////////////////////////////////////
    /// direct props ////////////////////////////
    /// if path being set, use this one rather than take from $parent
    @Prop({
        type: String,
        required: false
    })
    path: string;
    //////////////////////////////////////////////////////////////////////////////////////

    /// private //////////////////////////////////////////////////////////////////////////
    /// private helper
    private step: number = 0;
    @Watch('$parent.$route.path')
    private onRouteChanged(newValue: string, oldValue: string) {
        if (newValue.length >= oldValue.length) this.step++;
        else this.step--;
    }


    isChildRoute() {
        let router = FindRouter( this.path ? {
            path: this.path
        } : {
            component: this.$parent.constructor
        });
        if (router.length === 0) return false;

        let path = this.$parent.$route.path;
        let result = router.reduce( (final, route) => {
            if (final) return final;
            if (path.indexOf(route.path) === 0 && path.length > route.path.length) return true;
            return final;
        }, false);
        return result;
    }
    //////////////////////////////////////////////////////////////////////////////////////
}
export default RouteTransition;

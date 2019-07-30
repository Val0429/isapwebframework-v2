<template>
    <div style="inline" :id="'container-'+_uid">
        <div :class="{ circle: true, ['bg-'+variant]: !done, 'bg-success': done }" :id="'target-'+_uid">
            <i v-if="done" class="fa fa-check centered" />
            <div v-else class="centered text-white">{{label}}</div>
        </div>

        <b-popover
            v-if="isMounted"
            :target="'target-'+_uid"
            :show="$slots.default ? true : false"
            placement="bottom"
            :container="'container-'+_uid"
            >
            <div :class="{ current }"><slot /></div>
        </b-popover>
    </div>
</template>

<script lang="ts">
/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model } from "vue-property-decorator";

@Component
export class SCircle extends Vue {
    @Prop({
        type: [String, Number],
        required: true
    })
    label: string;

    @Prop({
        type: Boolean,
        default: false
    })
    done: boolean;

    @Prop({
        type: Boolean,
        default: false
    })
    current: boolean;

    @Prop({
        type: String,
        default: 'primary'
    })
    variant: string;

    isMounted = false;
    mounted() {
        setTimeout( () => {
            this.isMounted = true;
        }, 200);
    }
}
export default SCircle;
</script>


<style lang="scss" scoped>
.circle {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    line-height: 50px;
    text-align: center;
    pointer-events: none;
    @include transition(all .3s linear);
}
.centered {
    vertical-align: middle;
    text-align: center;
    font-size: 1.4rem;
    margin-right: 2px;
}
.current {
    font-weight: bold;
}
</style>


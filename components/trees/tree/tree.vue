<template>
    <ul v-if="result">
        <li>
            <slot :$attrs="{ result }" />

            <b-collapse
                :id="'collapse-'+_uid"
                :visible="innateVisible"
                >
                <template v-for="(child, index) in result.children || []">
                    <element ref="children" v-if="child" :is="leaf" :key="index" :data="child">
                        <!-- Pass on all named slots -->
                        <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot"/>

                        <!-- Pass on all scoped slots -->
                        <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope"><slot :name="slot" v-bind="scope"/></template>
                       
                    </element>
                </template>
            </b-collapse>
            
        </li>
    </ul>
</template>


<script lang="ts" src="./tree.vue.ts" />


<style lang="scss" scoped>
ul {
    padding-left: 24px;
}
li {
    display: block;
}
</style>

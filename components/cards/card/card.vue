<template>
    <b-card
        no-body
        :border-variant="data['border-variant']"
    >
        <b-card-header @dblclick="!data['hide-collapse-button'] ? innateVisible=!innateVisible : null" :header-bg-variant="data['header-bg-variant'] || 'iv-card-header'">

            <div class="title">{{ label }}</div>

            <div class="float-right toolbox">
                <slot name="toolbox" />
                <b-button v-if="!data['hide-collapse-button']" v-b-toggle="'collapse-' + _uid" :variant="data['header-bg-variant'] || 'iv-card-header'" size="sm" class="card-collapse-button fa fa-chevron-down" :class="{ card_close: !innateVisible }" />
            </div>

        </b-card-header>

        <b-collapse
            :visible="innateVisible"
            @show="innateVisible = true; $emit('update:visible', true);"
            @hide="innateVisible = false; $emit('update:visible', false);"
            :id="'collapse-' + _uid">
            <b-card-body :class="{ 'no-padding': noBodyPadding }">
                <slot />
            </b-card-body>

            <b-card-footer v-if="$slots.footer" :footer-bg-variant="data['footer-bg-variant'] || 'light'" class="footer">
                <slot name="footer-before" />
                <slot name="footer" />
                <slot name="footer-after" />
            </b-card-footer>
        </b-collapse>
    </b-card>
</template>

<script lang="ts" src="./card.vue.ts" />

<style lang="scss" scoped>
.card > .bg-iv-card-header {
    color: var(--black);
    background: var(--light);
}

.toolbox {
    position: absolute;
    display: flex;
    align-items: center;
    right: 0.4rem;
    height: 2.2rem;

    top: 0.3rem;

    > * {
        margin-left: 0.18rem;
        margin-right: 0.18rem;
    }

    .card-collapse-button {
        cursor: pointer;
        @include transition(all .2s linear);
    }

    .card_close {
        @include transform-origin(50% 50% 0);
        @include rotate(90);
    }
}

.no-padding {
    padding: 0 !important;
}

.title {
    display: inline-block;
    min-height: .8rem;
}

.footer {
    text-align: right;

    ::v-deep > * {
        margin: 0 .2rem;
    }
}
</style>


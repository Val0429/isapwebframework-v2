<template>
    <iv-modal
        :visible.sync="visible"
        :label="Title"
        @update:visible="doUpdateVisible"
    >
        <div class="content" v-html="Content" />

        <blockquote :cite="serverName">
            <pre>
{{ value.response.body || value.response.err.message }}
            </pre>
        </blockquote>

    </iv-modal>
</template>


<script lang="ts" src="./modal-response.vue.ts" />

<style lang="scss" scoped>
.content {
    margin-bottom: 30px;
}

blockquote {
    border-width: 2px 0;
    border-style: solid;
    border-color: #eee;
    padding: 1.5em 0 0.5em;
    margin: 1.5em 0;
    position: relative;
}
blockquote:before {
    content: '\201C';
    position: absolute;
    top: 0em;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    width: 3rem;
    height: 2rem;
    font: 6em/1.08em 'PT Sans', sans-serif;
    color: #666;
    text-align: center;
}
blockquote:after {
    content: "\2013 \2003" attr(cite);
    display: block;
    text-align: right;
    font-size: 0.875em;
    color: #e74c3c;
}
</style>
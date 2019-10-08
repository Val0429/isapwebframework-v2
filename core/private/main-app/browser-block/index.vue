<template>
    <div class="browser-blocked">
        <div class="browser-blocked-content">

            <div class="title">
                <div class="line" />

                <svg class="logo" width="142.86" height="57.274" viewBox="0 0 142.86 57.274">
                <defs>
                    <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0" stop-color="#09203f"/>
                    <stop offset="1" stop-color="#537895"/>
                    </linearGradient>
                </defs>
                <g id="isapLogo" transform="translate(-454.612 -196.941)">
                    <g id="组_10" data-name="组 10">
                    <g id="组_1" data-name="组 1" transform="translate(454.789 197.066)">
                        <path id="路径_2" data-name="路径 2" d="M460.008,207.782s11,9.206,24.795,4.372l1.024,3.984s-10.757-.092-10.191,10.255,13.049,8.222,14.447,6.417c0,0,.035-.046.054-.068.249-.287.607-.677.288.351l-.013.046c-.412,1.314-6.494,8.288-16.839,6.309-8.545-1.635-15.1-10.442-11.068-21.77,0,0-5.5-1.4-7.716-2.963Z" transform="translate(-454.789 -195.806)" stroke="#000" stroke-miterlimit="10" stroke-width="0.25" fill="url(#linear-gradient)"/>
                        <circle id="椭圆_1" data-name="椭圆 1" cx="7.144" cy="7.144" r="7.144" transform="translate(13.517)" fill="#193052" stroke="#000" stroke-miterlimit="10" stroke-width="0.25"/>
                    </g>
                    <g id="组_2" data-name="组 2" transform="translate(494.649 209.168)">
                        <path id="路径_3" data-name="路径 3" d="M519.366,216.86h-7.691l-.1-.588q-.241-2.248-1.357-2.8t-5.408-.554q-6.146,0-6.147,3.782,0,2.575,1.082,3.064t7.331.782q8.412.391,10.954,2.119t2.54,7.073q0,5.7-3.382,7.906t-12.138,2.2q-8.412,0-11.5-1.988t-3.09-7.432v-.782h8.172a6.624,6.624,0,0,0-.207,1.043q-.479,4.141,6.73,4.14,7.452,0,7.451-4.107,0-3.945-4.669-3.944-10.541,0-13.889-1.891t-3.347-7.857q0-5.346,3.056-7.236t11.743-1.891q8.208,0,11.04,1.826T519.366,216.86Z" transform="translate(-490.455 -207.895)" stroke="#000" stroke-miterlimit="10" stroke-width="0.25" fill="url(#linear-gradient)"/>
                        <path id="路径_4" data-name="路径 4" d="M530.91,217.313h-8.034q0-5.607,2.747-7.5t10.884-1.891q8.858,0,11.984,2.315t3.124,8.835v20.374h-7.862l.378-4.27-.207-.032q-2.266,4.662-10.472,4.661-11.916,0-11.916-9.616,0-9.715,12.19-9.715,8.139,0,9.89,3.554h.137v-5.054q0-3.649-1.34-4.84t-5.493-1.19Q530.91,212.944,530.91,217.313Zm5.254,8.182q-6.662,0-6.662,4.369,0,3.031,1.374,3.976t5.769.945q7.176,0,7.176-4.6Q543.821,225.494,536.164,225.495Z" transform="translate(-486.8 -207.892)" stroke="#000" stroke-miterlimit="10" stroke-width="0.25" fill="url(#linear-gradient)"/>
                        <path id="路径_5" data-name="路径 5" d="M554.573,208.286h8l-.31,4.629.172.032q2.85-5.053,10.609-5.053,7.177,0,9.872,3.374t2.7,12.306q0,9.324-2.678,12.779t-9.923,3.456q-7.726,0-10.1-4.889h-.137v17.9h-8.206Zm15.485,5.51q-4.5,0-5.871,1.923t-1.374,8.149q0,6.063,1.476,8.051t6.008,1.989q4.6,0,5.975-1.891t1.374-8.117q0-6.389-1.39-8.248T570.058,213.8Z" transform="translate(-482.915 -207.895)" stroke="#000" stroke-miterlimit="10" stroke-width="0.25" fill="url(#linear-gradient)"/>
                    </g>
                    </g>
                </g>
                </svg>

                <div class="line reverse" />
            </div>

            <div class="title1">
                This application does not support Internet Explorer.
            </div>

            <div class="title2">
                To continue, please use <a href="https://www.google.com/intl/zh-TW/chrome/" target="_blank">Google Chrome</a>, <a href="https://www.mozilla.org/zh-TW/firefox/new/" target="_blank">Firefox</a> or <a href="https://www.apple.com/tw/mac-pro/" target="_blank">Safari</a>.
            </div>

            <div class="icons">
                <a href="https://www.google.com/intl/zh-TW/chrome/" target="_blank"><img :src="images.chrome" /></a>
                <a href="https://www.mozilla.org/zh-TW/firefox/new/" target="_blank"><img :src="images.firefox" /></a>
                <a href="https://www.apple.com/tw/mac-pro/" target="_blank"><img :src="images.safari" /></a>
            </div>

        </div>
    </div>
</template>

<script lang="ts" src="./index.vue.ts" />

<style lang="scss" scoped>
.browser-blocked {
    position: relative;
    background: linear-gradient(180deg, #FAFAFA 0%, #D4D4D4 100%);
    height: 100vh;

    .browser-blocked-content {
        position: absolute;
        top: 50%;
        width: 100%;
        height: 220px;
        margin-top: -110px;
        // background: red;
    }

    .title {
        display: flex;
        align-items: stretch;
        justify-content: center;

        .line {
            @function gradient($start, $end, $direction) {
                $deg: 90deg;
                @if $direction == 1 {
                    $deg: 270deg;
                }
                @return linear-gradient($deg, $start 0%, $end 100%);
            }

            flex-grow: 1;
            height: 10px;
            align-self: center;
            //background: linear-gradient(90deg, #527794 0%, #193052 100%);
            background: gradient(#527794, #193052, 0);

            &.reverse {
                background: gradient(#527794, #193052, 1);
            }
        }

        .logo {
            margin: 0 20px;
        }
    }

    .title1 {
        text-align: center;
        font-weight: bold;
        margin: 25px 0 20px 0;
        letter-spacing: 2px;
    }
    .title2 {
        text-align: center;
        letter-spacing: 1px;
    }
    .icons {
        margin-top: 30px;
        text-align: center;
        a {
            img {
                width: 50px;
                height: 50px;
            }
        }
        a:hover img {
            -webkit-transform: scale(1.5);
            transform: scale(1.5);
            margin: 0 15px;
            -webkit-transition: .3s ease-in-out;
            transition: .3s ease-in-out;            
        }
    }
}
</style>

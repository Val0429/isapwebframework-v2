/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component } from "vue-property-decorator";
import { RegisterLoginRouter } from '@/../core';
import { ModalResponse } from '@/../components/modal';

@RegisterLoginRouter({
    name: "_('wb_Login')",
    path: "/login",
    disableContainer: true
})
@Component
export default class Login extends Vue {
    private username: string = '';
    private password: string = '';

    async Login() {
        await this.$login({
            username: this.username,
            password: this.password
        });
        this.$router.push("/");
    }
}

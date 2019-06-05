import { Vue, Component } from "vue-property-decorator";
import { RegisterLogin } from '@/../core';
import { ServerName, ServerVersion } from '@/../core/server';
import { ModalResponse } from '@/../components/modal';

@RegisterLogin({
    name: "_('wb_Login')",
    path: "/login",
    disableContainer: true
})
@Component
export default class Login extends Vue {
    private version = `${ServerName} ${ServerVersion}`;
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

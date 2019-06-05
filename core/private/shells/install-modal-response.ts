import Server from '@/config/default/server';
import { ModalResponse } from '@/../components/modal/modal-response';
Server.getDefault().sjError.subscribe( (e) => {
    new ModalResponse({
        propsData: {
            value: {
                uri: e.uri,
                method: e.method,
                response: e.error
            }
        }
    }).$modal();
})

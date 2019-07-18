import Server from '@/config/default/server';
import { ModalResponse } from '@/../components/modal/modal-response';
import { Subject } from 'rxjs';
import { filter, first, throttleTime } from 'rxjs/operators';
import { ISubjectError } from 'core/server';

let showModal = (e: ISubjectError) => {
    new ModalResponse({
        propsData: {
            value: {
                uri: e.uri,
                method: e.method,
                response: e.error
            }
        }
    }).$modal();
}

let sj401 = new Subject<ISubjectError>();
sj401.pipe(throttleTime(2000)).subscribe(showModal);

Server.getDefault().sjError.subscribe( (e) => {
    if (e.error.res.statusCode === 401) return sj401.next(e);
    showModal(e);
})

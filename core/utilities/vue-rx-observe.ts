import { Observable } from 'rxjs';
import { createDecorator } from 'vue-class-component';

/**
 * Usage:
 * @Observe({
 *    value: () => new BehaviorSubject<boolean>()
 * })
 * sjValue: boolean;
 * 
 * Directly:
 * this.$observables.sjValue.next(true);
 */
export type IObserve<T> = Observable<T> | { (): Observable<T> };
export function Observe<T>(options: { value: IObserve<T> }) {
    return createDecorator((componentOptions: any, key) => {
        let prevFunc = componentOptions.subscriptions;
        componentOptions.subscriptions = () => {
            return {
                [key]: typeof options.value === 'function' ? options.value() : options.value,
                ...(prevFunc ? prevFunc() : {})
            }
        }
    });
}
export class Action<T> {
    type: string;
    payload: T;
    constructor (type: string, payload: T) {
        this.type = type;
        this.payload = payload;
    }
}

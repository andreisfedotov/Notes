export class ClientBase {
    protected transformOptions(options: RequestInit) {
        const token = localStorage.getItem('token');
        options.headers = {
            ...options.headers,
            Authorization: 'Bearer ' + token,
        };
        return Promise.resolve(options);
    }
}

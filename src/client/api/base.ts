export class BaseWeChatApi {
    private client

    constructor(client?) {
        this.client = client
    }

    protected get(url, ...args) {
        return this.client.get(url, ...args)
    }

    protected post(url, ...args) {
        return this.client.post(url, ...args)
    }

}
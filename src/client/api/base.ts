import { BaseWeChatClient } from ".."

export class BaseWeChatApi {
    private client: BaseWeChatClient

    constructor(client?: BaseWeChatClient) {
        this.client = client
    }

    protected get(url: string, params?: Record<string, unknown>) {
        return this.client.get(url, params)
    }

    protected post(url: string, data?: Record<string, unknown>) {
        return this.client.post(url, data)
    }
}
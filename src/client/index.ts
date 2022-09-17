export class BaseWeChatClient {
    APP_BASE_URL = "";

    constructor() {

     }

    get(url: string, params: Record<string, unknown>) {
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                resolve(url)
            }, 3000);
        })
    }

    // abstract request(): void;

    // abstract decodeResult(): void;

    // abstract handleResult(): void;

    // abstract get(): void;

    // abstract post(): void;
}

import axios from 'axios'
import { SessionStorage } from '../session';
import { MemoryStorage } from '../session/memorystorage';
import { sleep } from '../utils';
export class BaseWeChatClient {
    API_BASE_URL = "";
    AUTO_RETRY = true
    MAX_RETRIES = 5
    session: SessionStorage
    appid: string
    secret: string

    constructor(appid: string, secret: string, accessToken?: string) {
        this.session = new MemoryStorage()
        this.appid = appid
        this.secret = secret
        if (accessToken) {
            this.session.set(this.accessTokenKey(), accessToken)
        }
    }

    private async request(url: string, options: Record<string, unknown>) {
        const accessToken = await this.accessToken()

        // 闭包：内部重试逻辑方法
        const _request = async () => {
            // 企业微信api报404, 400错误 则重试5次
            let retry = 5;
            while (true) {
                try {
                    const res = await axios.request({
                        url,
                        method: options.method as 'post' | 'get',
                        params: { access_token: accessToken, ...options.params as Record<string, string> },
                        data: options.data
                    });
                    if (res.status in [404, 400]) {
                        retry -= 1;
                        if (retry > 0) {
                            sleep(1000);
                            continue;
                        }
                    }
                    return res.data;
                } catch (error) {
                    console.error(error);
                }
            }
        };

        // 1) 处理自动加微信 API base_url
        if (
            !url.startsWith('http://') &&
            !url.startsWith('https://')
        ) {
            this.API_BASE_URL = options.API_BASE_URL as string || this.API_BASE_URL;
            url = `${this.API_BASE_URL}${url}`;
        }

        // 2) 请求及重试逻辑
        const autoRetry = this.AUTO_RETRY;
        const maxRetries = autoRetry ? Math.max(this.MAX_RETRIES, 1) : 1;
        let retryCnt = 0;
        while (retryCnt < maxRetries) {
            retryCnt += 1;
            let res: any, result: any;
            try {
                res = await _request();
                sleep(1000);
            } catch (error) { }
            try {
                result = this.handleResult(res);
                return result;
            } catch (error) { }
        }
    }

    private handleResult(res: any, resultProcessor?: (res: any) => any) {
        if ('base_resp' in res) {
        }
        if ('error_code' in res) {
            res.error_code = Number(res.error_code);
        }
        if (resultProcessor) {
            return resultProcessor(res);
        } else {
            return res;
        }
    }

    async fetchAccessToken() { }

    accessTokenKey() {
        return `${this.appid}_access_token`
    }

    async accessToken() {
        let accessToken = this.session.get(this.accessTokenKey())
        if (accessToken) {
            return accessToken
        } else {
            accessToken = await this.fetchAccessToken()
            return accessToken
        }
    }

    get(url: string, params?: Record<string, unknown>) {
        return this.request(url, { method: 'get', params })
    }

    post(url: string, data?: Record<string, unknown>) {
        return this.request(url, { method: 'post', data })
    }


    // abstract request(): void;

    // abstract decodeResult(): void;

    // abstract handleResult(): void;

    // abstract get(): void;

    // abstract post(): void;
}

import axios from "axios";
import { BaseWeChatClient } from "../../client";
import * as api from "./api"

export class WeChatClient extends BaseWeChatClient {
  API_BASE_URL = "https://qyapi.weixin.qq.com/cgi-bin/";

  constructor(appid: string, secret: string, accessToken?: string) {
    super(appid, secret, accessToken);
  }

  external_contact = new api.WeChatExternalContact(this)

  async fetchAccessToken() {
    const url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken"
    const res = await axios.get(url, { params: { "corpid": this.appid, "corpsecret": this.secret } })
    let expires_in = 7200
    if ("expires_in" in res.data) {
      expires_in = res["expires_in"]
    }
    this.session.set(this.accessTokenKey(), res.data.access_token, expires_in)
    return res.data.access_token
  }
}

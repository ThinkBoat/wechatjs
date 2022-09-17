import { BaseWeChatClient } from "../../client";
import * as api from "./api"

export class WeChatClient extends BaseWeChatClient {
  API_BASE_URL = "https://qyapi.weixin.qq.com/cgi-bin/";

  external_contact = new api.WeChatExternalContact(this)

  request() {}
}

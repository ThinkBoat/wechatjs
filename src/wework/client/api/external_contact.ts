import { BaseWeChatApi } from "../../../client/api/base";

export class WeChatExternalContact extends BaseWeChatApi {
    getFollowUserList() {
        return this.get('externalcontact/get_follow_user_list')
    }
}

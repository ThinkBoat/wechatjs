import { BaseWeChatApi } from "../../../client/api/base";

export class WeChatExternalContact extends BaseWeChatApi {
    getFollowUserList() {
        return this.get('externalcontact/get_follow_user_list')
    }

    /**
     * 配置客户联系「联系我」方式 https://work.weixin.qq.com/api/doc/90001/90143/92577
     * @param {number} type: 联系方式类型,1-单人, 2-多人
     * @param {number} scene: 场景，1-在小程序中联系，2-通过二维码联系
     * @param {number} style: 在小程序中联系时使用的控件样式，详见附表
     * @param {string} remark: 联系方式的备注信息，用于助记，不超过30个字符
     * @param {boolean} skip_verify: 外部客户添加时是否无需验证，默认为true
     * @param {string} state: 企业自定义的state参数，用于区分不同的添加渠道，在调用“获取外部联系人详情”时会返回该参数值
     * @param {string|string[]} user: 使用该联系方式的用户userID列表，在type为1时为必填，且只能有一个
     * @param {string[]} party: 使用该联系方式的部门id列表，只在type为2时有效
     * @returns: 返回的 JSON 数据包
     */
    addContactWay(
        type: number,
        user: string | string[],
        scene: number,
        style?: number,
        remark?: string,
        skipVerify?: string,
        state?: string,
        party?: string[]
    ) {
        const data = {
            type,
            scene,
            style,
            remark,
            skipVerify,
            state,
            user,
            party,
        };
        return this.post("externalcontact/add_contact_way", data);
    }

    /**
     * 获取企业已配置的「联系我」方式
     * https://developer.work.weixin.qq.com/document/path/92572
     * 
     * 批量获取企业配置的「联系我」二维码和「联系我」小程序按钮。
     * 详细请查阅企业微信官方文档 `获取企业已配置的「联系我」方式章节。
     * 
     * 调用接口应满足如下的权限要求：
     * - 需要使用`客户联系secret`或配置到`可调用应用`列表中的自建应用secret来初始化类。
     * - 使用人员需要配置了`客户联系功能`。
     * - 第三方调用时，应用需具有`企业客户权限`。
     * - 第三方/自建应用调用时，传入的userid和partyid需要在此应用的可见范围内。
     * - 配置的使用成员必须在企业微信激活且已经过实名认证。
     * - 临时会话的二维码具有有效期，添加企业成员后仅能在指定有效期内进行会话，临时会话模式可以配置会话结束时自动发送给用户的结束语。
     * @param {string} configId: 联系方式的配置id
     * @returns: 返回的 JSON 数据包
     */
    getContactWay(configId: string) {
        return this.post("externalcontact/get_contact_way", { config_id: configId })
    }

    /**
     * 批量获取企业已配置的「联系我」方式
     * https://developer.work.weixin.qq.com/document/path/92572
     * @returns: 返回的 JSON 数据包
     */
    listContactWay() {
        return this.post("externalcontact/list_contact_way")
    }


}

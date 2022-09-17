import { WeChatClient } from ".";

describe('test/wechat_client.test.ts', function () {

  it('should test wechat_client init', async function () {
    const client = new WeChatClient()
    const res = await client.external_contact.getFollowUserList()
    expect(client.API_BASE_URL).toEqual("https://qyapi.weixin.qq.com/cgi-bin/")
    expect(res).toEqual("externalcontact/get_follow_user_list")
  });
});

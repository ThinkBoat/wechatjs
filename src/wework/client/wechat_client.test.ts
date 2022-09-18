import { describe, expect } from '@jest/globals';
import { WeChatClient } from ".";

describe('test/wechat_client.test.ts', function () {
  it('should test wechat_client', async function () {
    const client = new WeChatClient("ww3d5edf8f852c432e", "rJaUP0-SJREJtlOYaU6NfrWFT89lZGojUNQNSlOJhWw")
    const getFollowUserList = await client.external_contact.getFollowUserList()
    expect(getFollowUserList.errmsg).toEqual("ok")
    const userList = getFollowUserList["follow_user"] as string[]
    const addContactWay = await client.external_contact.addContactWay(2, userList, 2)
    expect(addContactWay.errmsg).toEqual("ok")
    const getContactWay = await client.external_contact.getContactWay(addContactWay.config_id)
    expect(getContactWay.errmsg).toEqual("ok")
    const listContactWay = await client.external_contact.listContactWay()
    expect(listContactWay.errmsg).toEqual("ok")
  });
});

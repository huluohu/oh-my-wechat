export enum DatabaseName {
  manifest = "manifest",
  session = "session",
  message = "message",
  WCDB_Contact = "WCDB_Contact",
}

export enum MessageDirection {
  outgoing = 0,
  incoming = 1,
}

export type DatabaseRow<T extends object> = T & {
  rowid: number;
};

export type DatabaseMessageRow = DatabaseRow<{
  createTime: number;
  Des: MessageDirection;
  ImgStatus: 1 | 2; // unknown
  MesLocalID: number;
  Message: string;
  MesSvrID: number;
  Status: number;
  TableVer: number;
  Type: MessageType;
}>;

export type DatabaseFriendRow = DatabaseRow<{
  userName: string;
  certificationFlag: number; // 0: 个人
  // dbContactBrand BLOB,
  // dbContactChatRoom BLOB,
  // dbContactEncryptSecret BLOB,
  // dbContactHeadImage BLOB,
  // dbContactLocal BLOB,
  // dbContactOpenIM BLOB,
  // dbContactOther BLOB,
  // dbContactProfile BLOB,
  // dbContactRemark BLOB,
  // dbContactSocial BLOB,
  encodeUserName: string;
  extFlag: number;
  imgStatus: number;
  openIMAppid: string;
  type: number;
  typeExt: number;
}>;

export interface Contact {
  wxid: `wxid_${string}`;
  id: string;
  nickname: string;
  nicknamePinyin: string;
  remark: string;
  remarkPinyin: string;
  remarkPinyinInits: string;
}

export enum MessageType {
  TEXT = 1, // 文本消息
  IMAGE = 3, // 图片消息
  VOICE = 34, // 语音消息
  CONTACT = 42, // 名片消息（人/公众号）
  VIDEO = 43, // 视频消息
  STICKER = 47, // 表情
  LOCATION = 48, // 位置消息
  APP = 49, // 好多可能，里面还有类型
  VOIP = 50, // 语音/视频通话
  MICROVIDEO = 62, // 小视频
  GROUP_VOIP = 64, // 群语音/视频通话 TODO: 可能是通知
  SYSTEM = 10000, // 系统消息,应该只是文本
  SYSTEM_EXTENDED = 10002,
}
export enum AppMessageType {
  TEXT = 1,
  IMAGE = 2,
  AUDIO = 3,
  VIDEO = 4,
  URL = 5, // 小程序通知？
  ATTACH = 6,
  STICKER = 8,
  FORWARD_MESSAGE = 19,
  MINIAPP = 33,
  MINIAPP_UNKNOWN = 36,
  CHANNEL = 51,
  REFER = 57,
  PAT = 62, //拍一拍
  LIVE = 63,
  ATTACH_2 = 74,
  ANNOUNCEMENT = 87,
  GAME_SHARE = 101,
  TRANSFER = 2000,
  RED_ENVELOPE = 2001,
}

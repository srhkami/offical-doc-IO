// 程式功能：用以儲存往網頁訊息的靜態資料

export const appVer = '1140430'

// 根IP
// export const ROOT_IP = 'https://api.pigeonhand.tw';  // 正式環境
export const ROOT_IP = 'http://localhost:8000'; // 開發環境


// 儲存靜態媒體IP，不須以「/」開頭
export const MEDIA_IP = ROOT_IP + '/';
// 訪問API之IP，須以「/」開頭
export const WEB_API = ROOT_IP + '/web';
export const USER_API = ROOT_IP + '/user';
export const POLICE_API = ROOT_IP + '/police';
export const TRAFFIC_API = ROOT_IP + '/traffic';

export const APP_ICON = MEDIA_IP + "media/icon/icon_trafficpigeon.png"

// 用來儲存通用的TS類別

export type TypeAuthContext = {
  isAuthenticated: boolean,
  setIsAuthenticated: (val: boolean) => void,
  userInfo: UserInfo,
}

export type AuthCheckObject = {
  login: number,
  admin: number,
  user: number,
  letter: number,
  file: number,
  essay: number,
  accredited: number,
}

export type AuthCheck = keyof AuthCheckObject


export type ApiResData<T> = {
  "total_count": number,
  "page_count": number,
  "page_number": number,
  "next": string | null,
  "previous": string | null,
  "results": T,
} // 類別：Viewset API 返回的預設格式


export type UserLoginForm = {
  email: string,
  password: string,
}


export type UserInfo = {
  'id': number,
  'username': string,
  'auth': string,
  'email': string,
  'accStatus': 0 | 1 | 2 | 3 | 4,
  'bookmark': string,
  'name': string,
}


export type ApiKeywordForm = {
  keyword: string,
}


export type DocOutDetail = {
  id: number,
  reportDate: string,
  sendDate: string,
  groupName: string,
  number: number,
  title: string,
  username: string,
  status: 0 | 1 | 2,
  status_display: string,
  remark: string,
  checked: 0 | 1,
}

export type DocInDetail = {
  id: number,
  receiveDate: string,
  readDate: string,
  groupName: string,
  number: number,
  title: string,
  username: string,
  status: 0 | 1,
  status_display: string,
  remark: string,
}

export type GroupDetail = {
  id: number,
  name: string,
}

export type UserDetail = {
  id: number,
  name: string,
  area: number,
  workContent: string,
}

export type TypeOrderList = Array<{
  text: string,
  param: {
    ordering?: string,
    status?: string,
  }
}>

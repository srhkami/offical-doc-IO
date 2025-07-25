/* API相關的類型 */

//DRF Viewset API 返回的預設格式
export type ApiResData<T> = {
  "total_count": number,
  "page_count": number,
  "page_number": number,
  "next": string | null,
  "previous": string | null,
  "results": T,
}

// 向API傳送的關鍵字表單
export type ApiKeywordForm = {
  keyword: string,
}

// 資料檢視組件中用來排序篩選的組件，傳入的清單
export type DataOrderList = Array<{
  text: string,
  param: {
    ordering?: string,
    review?: string,
    accredit_status?: string,
    community_join_at__isnull?: string,
    accredit_expiry?:string,
    mode?: 'new',
    auth?: string,
  }
}>

// 推送消息表單
export type WebPushForm = {
  to_user_id?: number, // 預設不指定會員
  group?: number, // 預設全域推送
  payload: {
    title: string,
    body: string,
    icon: '/icons/Logo192.png',
    url:string,
  }
}
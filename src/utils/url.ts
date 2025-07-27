export function getQueryParams(url:string) {
  // 解析網頁params
  // 前置動作：
  // const location = useLocation();
  // const url = location.search; 取得目前的 URL query string
  const queryString = url.split('?')[1]; // 取得 `?` 之後的內容
  return Object.fromEntries(new URLSearchParams(queryString)); //返回鍵值對物件
}

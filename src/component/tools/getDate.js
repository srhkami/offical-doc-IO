export function getDate() {
  // 用來處理日期相關的函數
  // 返回：
  // today：今日的日期，格式為YYYY-MM-DD
  // ym：今日的民國年月，格式為YYYYMM
  // 範例：{today: "2023-08-10", ym: "10808"}
  const date = new Date();
  let month = date.getMonth() + 1
  if (month < 10) {
    month = `0${month}`;
  }
  let year = date.getFullYear()
  let day = date.getDate()
  if (day < 10) {
    day = `0${day}`;
  }
  return {
    today: `${year}-${month}-${day}`,
    ym: `${year - 1911}${month}`,
  }
}
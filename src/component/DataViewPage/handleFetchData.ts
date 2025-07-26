import type {Dispatch, SetStateAction} from "react";
import isEqual from "fast-deep-equal";
import type {ApiResData} from "@/types/api-types.ts";
import {showToast} from "@/utils/handleToast.ts";

type TWithId = { id: number };

/* 從資料庫取得資料，並比對新舊資料刷新顯示 */
export function fetchData<T extends TWithId>(
  requestData: () => Promise<ApiResData<Array<T>>>, // 從API取得資料的函數
  setData: Dispatch<SetStateAction<Array<T>>>, // 設定Data State的函數
  setPageCount: Dispatch<SetStateAction<number>> // 設定總頁數的函數
) {
  showToast(
    async () => {
      const resData = await requestData();
      const newItems = resData.results;
      setPageCount(resData.page_count)
      setData(prevItems => {
        // 建立一個映射以方便比對
        const prevMap = new Map(prevItems.map(item => [item.id, item]));
        // 建立一個最後輸出的清單
        const updated: Array<T> = [];
        // 處理新增與更新
        for (const newItem of newItems) {
          const prevItem = prevMap.get(newItem.id);
          if (!prevItem || !isEqual(prevItem, newItem)) {
            updated.push(newItem); // 新增或已變更
          } else {
            updated.push(prevItem); // 沒變則保留原參考
          }
        }
        return updated;
      });
    }, {baseText: '載入'}
  ).catch(err => console.error('取得資料錯誤:', err))
}

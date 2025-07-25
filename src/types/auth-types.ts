import {UserInfo} from "./user-types.ts";
import {Dispatch, SetStateAction} from "react";

/*權限相關類型*/

// 全域權限驗證
export type TypeAuthContext = {
  isAuthenticated: boolean,
  setIsAuthenticated: (val: boolean) => void,
  userInfo: UserInfo,
  setReload: Dispatch<SetStateAction<boolean>>,
}

// 確認權限，數字代表位數
export type TypeAuthCheck = {
  AM: number,
  UM: number,
  TM: number,
  CM: number,
  V: number,
  T: number,
  C: number,
  S: number,
  L: number,
}

// 各類權限
export type AuthType = keyof TypeAuthCheck;

// 權限位數
export const AUTH_CHECK: TypeAuthCheck = {
  AM: 1,
  UM: 2,
  TM: 3,
  CM: 4,
  V: 5,
  T: 6,
  C: 7,
  S: 8,
  L: 0,
}
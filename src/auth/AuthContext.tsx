import React, {type ReactNode, useState, createContext, useEffect} from "react";
import axios from 'axios'
import toast from "react-hot-toast";
import {Link} from "react-router";
import {Button} from "@/component";
import {type UserInfo} from "@/types/user-types.ts";
import {type TypeAuthContext} from "@/types/auth-types.ts";
import {USER_API} from "@/utils/info.ts";

type Props = {
  children: ReactNode,
}

const noLoginUser:UserInfo ={
  id: 0,
  auth: '00000000',
  email: '',
  wait_accredit: 0,
  expiry_days: null,
  bookmark: '["bk"]',
  options: {},
  name: '訪客'
}

const AuthContext: React.Context<any> = createContext({}); //還未完全測試正確錯誤
export default AuthContext;

/* 全域使用的變數
*  組件流程：
*   1. 網站載入時，會先刷新一次Token
*   2. 使用新的Token，驗證並取得資料
*   3. 資料保存在變數中，僅能被組件取得
*   4. 當網站關閉時，不會儲存此資訊
* */
export const AuthProvider = ({children}: Props) => {

  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo>(noLoginUser);
  const [reload, setReload] = useState<boolean>(false);

  const setIsAuthenticated = (val: boolean) => {
    if (!val) {
      setIsAuthenticatedState(false);
      setUserInfo(noLoginUser)
    }
    setIsLoading(true);
    verifyToken()
    // setIsAuthenticatedState(val)
  }

  const handleToast = (expiry_days: number | null) => {
    let tip: Array<string> = []
    if (!expiry_days) {
      return
    }
    if (expiry_days >= 0) {
      return
    }
    if (expiry_days < 0 && expiry_days >= -30) {
      tip = ['您的會員有效日已到期', `請於${30 + expiry_days}天內重新進行認證，否則將取消瀏覽權限`]
    } else {
      tip = ['您的會員有效日逾期過久', '目前已遭系統取消瀏覽權限，請重新進行認證']
    }
    toast(t => (
      <div className='w-72'>
        <div className='font-bold text-error'>
          {tip[0]}
        </div>
        <div className='text-xs mt-1'>
          {tip[1]}
        </div>
        <div className='flex justify-end mt-2'>
          <Link to='/user/accredit' className='btn btn-sm btn-accent me-2'>
            前往認證
          </Link>
          <Button size='sm' color='neutral' style='outline' onClick={() => toast.dismiss(t.id)}>
            稍後再說
          </Button>
        </div>
      </div>
    ))
  }

  // 刷新Token
  const refreshToken = () => {
    axios({
      method: 'post',
      url: USER_API + '/token/refresh/',
      withCredentials: true,
    })
      .then(() => {
        verifyToken();  // 成功後繼續驗證
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
        setIsAuthenticatedState(false);
      });
  }

  // 重新驗證Token，並取得資料
  const verifyToken = () => {
    axios<UserInfo>({
      method: 'post',
      url: USER_API + '/token/verify/',
      withCredentials: true,
    })
      .then(res => {
        const data = res.data;
        const expiry_days = data.expiry_days;
        setUserInfo({
          id: data.id,
          auth: data.auth,
          email: data.email,
          wait_accredit: data.wait_accredit,
          expiry_days: expiry_days,
          bookmark: data.bookmark,
          options: data.options,
          name: data.name,
        });
        setIsLoading(false);
        setIsAuthenticatedState(true);
        handleToast(expiry_days)
      })
      .catch(err => {
        console.log(err);
        toast.error('登入逾期');
        setIsLoading(false);
        setIsAuthenticatedState(false);
      })
  }

  useEffect(() => {
    refreshToken();
  }, [reload])

  // 全局可調用的變數
  const contextData: TypeAuthContext = {
    isAuthenticated: isAuthenticatedState,
    setIsAuthenticated: setIsAuthenticated,
    userInfo: userInfo,
    setReload: setReload,
  }

  return (
    <AuthContext.Provider value={contextData}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  )
}
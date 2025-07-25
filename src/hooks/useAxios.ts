import axios from 'axios'
import {USER_API} from "@/utils/info.ts";
import toast from "react-hot-toast";

/* 攔截器：如果token未過期，則直接傳回請求。或先刷新token，然後返回請求。
*  使用此方法傳出的請求，會自動夾帶Header，且若Token過期，會先進行Token刷新
*  使用方法同一般Axios
*/
export default function useAxios() {
  const axiosInstance = axios.create({
    baseURL: USER_API,
    withCredentials: true, // ✅ 所有請求自動帶上 cookie
  });

  axiosInstance.interceptors.request.use(req => {
    // 不再加入 Authorization header，cookie 會自動處理
    return req;
  });

  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      if (error.response?.status === 401) {
        try {
          // 嘗試使用 cookie 中的 refresh_token 自動刷新
          await axios.post(
            USER_API + '/token/refresh/',
            {},
            { withCredentials: true }
          );

          // 重新送出原本的請求
          return axiosInstance(error.config);
        } catch (err) {
          console.error('無效Token');
          toast.error('登入逾期，請重新登入')
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

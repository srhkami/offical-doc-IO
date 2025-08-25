import {Button} from "@/component";
import {type SubmitHandler, useForm} from "react-hook-form";
import {showToast} from "@/utils/handleToast.ts";
import {useContext} from "react";
import AuthContext from "../../../auth/AuthContext.tsx";
import {type UserLoginForm} from "@/types/user-types.ts";
import {showFormError} from "@/utils/handleFormErrors.ts";
import {handleLogin} from "@/auth/handleUser.ts";

export default function PasswordForm() {

  const {setReload} = useContext(AuthContext);
  const {register, handleSubmit, setError, formState: {errors}}
    = useForm<UserLoginForm>({defaultValues: {email: '7523134@m2.cypd.gov.tw'}});

  const onSubmit: SubmitHandler<UserLoginForm> = (formData) => {
    showToast(
      handleLogin(formData),
      {baseText: '登入', success: '登入成功'}
    )
      .then(() => {
        setReload(true);
      })
      .catch(err => showFormError(err, setError))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mx-auto max-w-80'>
      <label htmlFor='email' className="label text-sm">信箱</label>
      <input id='email' type="text" className="input w-full"
             {...register('email', {
               required: '此欄位必填',
               pattern: {
                 value: /[\w-]+@([\w-]+\.)+[\w-]+/,
                 message: '信箱格式不符，請重新輸入'
               }
             })}/>
      {errors.email && <span className="text-error text-xs">{errors.email.message}</span>}
      <label htmlFor='password' className="label text-sm mt-3">密碼</label>
      <input id='password' type="password" className="input w-full"
             {...register('password', {required: '此欄位必填'})}/>
      {errors.password && <span className="text-error text-sm">{errors.password.message}</span>}
      <Button color='neutral' shape='block' className="mt-4">登入</Button>
    </form>
  )
}
import {useAxios, useCacheApi} from "@/hooks";
import type {ApiResData} from "@/types/api-types.ts";
import type {UserDetail} from "@/types/doc-types.ts";
import {ROOT_IP} from "@/utils/info.ts";
import {type SubmitHandler, useForm} from "react-hook-form";
import {Button, Col, FormInputCol, Row} from "@/component";
import {showToast} from "@/utils/handleToast.ts";
import {useState} from "react";
import {showFormError} from "@/utils/handleFormErrors.ts";
import UserItem from "@/features/Setting/UserItem.tsx";
import {MdAddCircle} from "react-icons/md";

/**
 * 管理人員的組件
 * @constructor
 */
export default function UserManage() {

  const api = useAxios();
  const [reload, setReload] = useState<boolean>(false);
  const users
    = useCacheApi<ApiResData<Array<UserDetail>>>(ROOT_IP + '/doc/users/?ordering=area', null, reload)

  const {register, handleSubmit, setError, reset, formState: {errors}} = useForm<UserDetail>();

  const onSubmit: SubmitHandler<UserDetail> = async (formData) => {
    showToast(
      api({
        method: 'POST',
        url: ROOT_IP + '/doc/users/',
        data: formData,
      }),
      {success: '新增成功'}
    )
      .then(() => {
        setReload(p => !p);
        reset();
      })
      .catch(err => showFormError(err, setError))
  }

  const itemList = users.data?.results.map(user => {
    return (
      <UserItem key={user.id} user={user} setReload={setReload}/>
    )
  })

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <FormInputCol xs={6} label='ID' error={errors.name?.message} className='hidden'>
            <input className='input input-sm w-full' type='number' readOnly
                   {...register('id')}
            />
          </FormInputCol>
          <FormInputCol xs={6} label='姓名' error={errors.name?.message}>
            <input className='input input-sm w-full'
                   {...register('name', {required: '此欄位必填', maxLength: {value: 16, message: '最多16個字'}})}
            />
          </FormInputCol>
          <FormInputCol xs={6} label='勤區' error={errors.area?.message}>
            <input className='input input-sm w-full' type='number'
                   {...register('area', {
                     required: '此欄位必填',
                     min: {value: 0, message: '最小值為0'},
                     max: {value: 99, message: '最大值為99'}
                   })}
            />
          </FormInputCol>
          <FormInputCol xs={12} label='業務' error={errors.workContent?.message}>
          <textarea className='textarea textarea-sm w-full'
                    {...register('workContent')}
          />
          </FormInputCol>
          <Col xs={12} className='mt-4'>
            <Button color='primary' size='sm' shape='block'>
              <MdAddCircle/>新增
            </Button>
          </Col>
        </Row>
      </form>
      <div className='divider'></div>
      <ul className='list'>
        {itemList}
      </ul>
    </div>
  )
}
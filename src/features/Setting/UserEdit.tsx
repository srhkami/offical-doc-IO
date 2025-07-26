import {UserCard} from "@/features";
import {useAxios, useCacheApi} from "@/hooks";
import type {ApiResData} from "@/types/api-types.ts";
import type {UserDetail} from "@/types/doc-types.ts";
import {ROOT_IP} from "@/utils/info.ts";
import {type SubmitHandler, useForm} from "react-hook-form";
import {Button, Col, FormInputCol, Row} from "@/component";
import {FaEdit} from "react-icons/fa";
import {showToast} from "@/utils/handleToast.ts";
import {useState} from "react";
import {showFormError} from "@/utils/handleFormErrors.ts";

export default function UserEdit() {

  const api = useAxios();
  const [reload, setReload] = useState<boolean>(false);
  const users
    = useCacheApi<ApiResData<Array<UserDetail>>>(ROOT_IP + '/doc/users/?ordering=area', null, reload)

  const {register, handleSubmit, setError, setValue, setFocus, reset, formState: {errors}} = useForm<UserDetail>();

  const itemList = users.data?.results.map(user => {

    const onEdit = () => {
      setValue('id', user.id)
      setValue('area', user.area)
      setValue('name', user.name)
      setValue("workContent", user.workContent)
      setFocus('workContent')
    }

    return (
      <li key={user.id} className='my-1'>
        <UserCard
          user={user}
          header={
            <Button size='sm' color='neutral' style='outline' onClick={onEdit}>
              <FaEdit/> 編輯
            </Button>
          }
        />
      </li>
    )
  })

  const onPut =  async (formData:UserDetail) => {
    return api({
      method: 'PUT',
      url: ROOT_IP + `/doc/users/${formData.id}/`,
      data: formData,
    })
  }

  const onPost = async (formData:UserDetail)=>{
    return api({
      method: 'POST',
      url: ROOT_IP + '/doc/users/',
      data: formData,
    })
  }

  const onSubmit: SubmitHandler<UserDetail> = async (formData) => {
    showToast(
      async ()=>{
        if(formData.id){
          await onPut(formData);
        }else{
          await onPost(formData);
        }
      },
      {success:'儲存成功'}
    )
      .then(()=>{
      setReload(p=>!p);
      reset();
    })
      .catch(err=>showFormError(err,setError))
  }

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
                   {...register('name', {required: true, maxLength: 16})}
            />
          </FormInputCol>
          <FormInputCol xs={6} label='勤區' error={errors.area?.message}>
            <input className='input input-sm w-full' type='number'
                   {...register('area', {required: true, min: 0, max: 99})}
            />
          </FormInputCol>
          <FormInputCol xs={12} label='業務' error={errors.workContent?.message}>
          <textarea className='textarea textarea-sm w-full'
                    {...register('workContent')}
          />
          </FormInputCol>
          <Col xs={12} className='mt-4'>
            <Button color='primary' size='sm' shape='block'>
              儲存
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
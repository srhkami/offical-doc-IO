import {UserCard} from "@/features";
import {Button, Col, FormInputCol, Row} from "@/component";
import {FaEdit} from "react-icons/fa";
import type {UserDetail} from "@/types/doc-types.ts";
import {type Dispatch, type SetStateAction, useState} from "react";
import {type SubmitHandler, useForm} from "react-hook-form";
import {showToast} from "@/utils/handleToast.ts";
import {showFormError} from "@/utils/handleFormErrors.ts";
import {ROOT_IP} from "@/utils/info.ts";
import {useAxios} from "@/hooks";
import {MdDeleteForever} from "react-icons/md";
import toast from "react-hot-toast";
import {FaXmark} from "react-icons/fa6";

type Props = {
  readonly user: UserDetail,
  readonly setReload: Dispatch<SetStateAction<boolean>>,
}

export default function UserItem({user, setReload}: Props) {

  const api = useAxios();
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const {register, handleSubmit, setError, setFocus, formState: {errors}}
    = useForm<UserDetail>({defaultValues: user});

  const onToast = () => {
    toast((t) => (
      <div className='flex items-center'>
        <div className='font-bold'>
          是否確定刪除？
        </div>
        <Button size='sm' color='error' className='mx-2' onClick={onDelete}>
          刪除
        </Button>
        <Button size='sm' color='secondary' onClick={() => toast.dismiss(t.id)}>
          取消
        </Button>
      </div>
    ))
  }

  const onSubmit: SubmitHandler<UserDetail> = (formData) => {
    showToast(
      api({
        method: 'PATCH',
        url: ROOT_IP + `/doc/users/${user.id}/`,
        data: formData,
      }),
      {success: '儲存成功'}
    )
      .then(() => setReload(p => !p))
      .catch(err => showFormError(err, setError))
  }

  const onDelete = () => {
    showToast(
      api({
        method: 'DELETE',
        url: ROOT_IP + `/doc/users/${user.id}/`,
      }),
      {success: '刪除成功'}
    )
      .then(() => setReload(p => !p))
      .catch(err => showFormError(err, setError))
  }

  if (isEdit) {
    return (
      <li className='my-1'>
        <div className='card bg-base-100 border border-base-300'>
          <div className='card-body'>
            <Row>
              <Col xs={12} className='flex justify-end'>
                <Button color='secondary' size='sm' onClick={() => setIsEdit(false)}>
                  <FaXmark/>取消
                </Button>
              </Col>
              <FormInputCol xs={6} label='勤區' error={errors.area?.message}>
                <input className='input input-sm w-full' type='number'
                       {...register('area', {
                         required: '此欄位必填',
                         min: {value: 0, message: '最小值為0'},
                         max: {value: 99, message: '最大值為99'}
                       })}
                />
              </FormInputCol>
              <FormInputCol xs={6} label='姓名' error={errors.name?.message}>
                <input className='input input-sm w-full'
                       {...register('name', {required: '此欄位必填', maxLength: {value: 16, message: '最多16個字'}})}
                />
              </FormInputCol>
              <FormInputCol xs={12} label='業務' error={errors.workContent?.message}>
                  <textarea className='textarea textarea-sm w-full'
                            {...register('workContent')}
                  />
              </FormInputCol>
              <Col xs={6} className='mt-4 px-2'>
                <Button size='sm' color='error' shape='block' onClick={onToast}>
                  <MdDeleteForever className='text-lg'/>刪除此筆
                </Button>
              </Col>
              <Col xs={6} className='mt-4 px-2'>
                <Button color='success' size='sm' shape='block' onClick={handleSubmit(onSubmit)}>
                  儲存變更
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </li>
    )
  }

  return (
    <li className='my-1'>
      <UserCard
        user={user}
        header={
          <Button size='sm' color='neutral' style='outline' onClick={() => {
            setIsEdit(true);
            setTimeout(() => {
              setFocus('workContent')
            }, 50)
          }}>
            <FaEdit/> 編輯
          </Button>
        }
      />
    </li>
  )
}
import {Button, Col, FormInputCol, Row} from "@/component";
import {FaXmark} from "react-icons/fa6";
import {MdDeleteForever} from "react-icons/md";
import {type SubmitHandler, useForm} from "react-hook-form";
import type {GroupDetail} from "@/types/doc-types.ts";
import {type Dispatch, type SetStateAction, useState} from "react";
import {useAxios} from "@/hooks";
import toast from "react-hot-toast";
import {showToast} from "@/utils/handleToast.ts";
import {ROOT_IP} from "@/utils/info.ts";
import {showFormError} from "@/utils/handleFormErrors.ts";
import {FaEdit} from "react-icons/fa";

type Props = {
  readonly group: GroupDetail,
  readonly setReload: Dispatch<SetStateAction<boolean>>,
}

export default function GroupItem({group, setReload}: Props) {

  const api = useAxios();
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const {register, handleSubmit, setError, formState: {errors}}
    = useForm<GroupDetail>({defaultValues: group});

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

  const onSubmit: SubmitHandler<GroupDetail> = (formData) => {
    showToast(
      api({
        method: 'PATCH',
        url: ROOT_IP + `/doc/groups/${group.id}/`,
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
        url: ROOT_IP + `/doc/groups/${group.id}/`,
      }),
      {success: '刪除成功'}
    )
      .then(() => setReload(p => !p))
      .catch(err => showFormError(err, setError))
  }

  return (
    <li className='my-1'>
      <div className='card bg-base-100 border border-base-300'>
        <div className='card-body'>
          {isEdit ?
            <Row>
              <Col xs={12} className='flex justify-end'>
                <Button color='secondary' size='sm' onClick={() => setIsEdit(false)}>
                  <FaXmark/>取消
                </Button>
              </Col>
              <FormInputCol xs={12} label='名稱' error={errors.name?.message}>
                <input className='input input-sm w-full'
                       {...register('name', {required: true, maxLength: 16})}
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
            :
            <div className='flex justify-between'>
              <div className='text-lg'>
                {group.name}
              </div>
              <Button size='sm' color='neutral' style='outline'
                      onClick={() => setIsEdit(true)}>
                <FaEdit/> 編輯
              </Button>
            </div>
          }
        </div>
      </div>
    </li>
  )
}
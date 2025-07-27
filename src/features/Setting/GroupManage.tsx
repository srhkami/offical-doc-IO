import {useAxios, useCacheApi} from "@/hooks";
import type {ApiResData} from "@/types/api-types.ts";
import type {GroupDetail} from "@/types/doc-types.ts";
import {ROOT_IP} from "@/utils/info.ts";
import {useState} from "react";
import {type SubmitHandler, useForm} from "react-hook-form";
import {Button} from "@/component";
import {MdAddCircle} from "react-icons/md";
import GroupItem from "@/features/Setting/GroupItem.tsx";
import {showToast} from "@/utils/handleToast.ts";
import {showFormError} from "@/utils/handleFormErrors.ts";

export default function GroupManage() {

  const api = useAxios();
  const [reload, setReload] = useState<boolean>(false);
  const {data} = useCacheApi<ApiResData<Array<GroupDetail>>>(ROOT_IP + '/doc/groups/', null, reload)
  const {register, handleSubmit, setError,reset, formState: {errors}} = useForm<GroupDetail>();

  const itemList = data?.results.map(group => {
    return (
      <GroupItem key={group.id} group={group} setReload={setReload}/>
    )
  })

  const onSubmit: SubmitHandler<GroupDetail> = (formData) => {
    showToast(
      api({
        method: 'POST',
        url: ROOT_IP + '/doc/groups/',
        data: formData,
      }),
      {success: '儲存成功'}
    )
      .then(() => {
        setReload(p => !p);
        reset();
      })
      .catch(err => showFormError(err, setError))
  }

  return (
    <div>
      <div className='flex justify-center items-start'>
        <div>
          <input className='input input-sm' placeholder='請輸入名稱'
                 {...register('name', {required: '此欄位必填', maxLength: {value: 16, message: '最多16個字'}})}/>
          <span className='text-error text-xs'>{errors.name?.message}</span>
        </div>
        <Button color='primary' size='sm' className='ml-2' onClick={handleSubmit(onSubmit)}>
          <MdAddCircle/>新增
        </Button>
      </div>
      <div className='divider'></div>
      <ul className='list'>
        {itemList}
      </ul>
    </div>
  )
}
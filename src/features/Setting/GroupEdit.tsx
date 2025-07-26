import {useCacheApi} from "@/hooks";
import type {ApiResData} from "@/types/api-types.ts";
import type {GroupDetail} from "@/types/doc-types.ts";
import {ROOT_IP} from "@/utils/info.ts";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Button, Col, FormInputCol, Row} from "@/component";

export default function GroupEdit() {

  const [reload, setReload] = useState<boolean>(false);
  const {data} = useCacheApi<ApiResData<Array<GroupDetail>>>(ROOT_IP + '/doc/groups/', null, reload)
  const {register, handleSubmit, formState: {errors}} = useForm<GroupDetail>();

  const itemList = data?.results.map(group => {
    return(
      <tr key={group.id}>
        <td className='text-center'>{group.name}</td>
        <td className='text-center'>
          <Button color='error' size='sm' style='outline'
                  onClick={() => handleDeleteGroup(obj.id)}>
            刪除
          </Button>
        </td>
      </tr>
    )
  })

  return (
    <div>
      <form>
        <Row>
          <FormInputCol xs={6} label='名稱' error={errors.name?.message}>
            <input className='input input-sm w-full' type='number' readOnly
                   {...register('name', {required: true, maxLength: 16})}
            />
          </FormInputCol>
          <Col xs={6} className='flex justify-end items-end'>
            <Button color='primary' size='sm'>
              儲存
            </Button>
          </Col>
        </Row>
      </form>
      <div className='divider'></div>
      <table className='table'>
        <thead>
        <tr>
          <th scope="col" className='text-center'>組別</th>
          <th scope="col" className='text-center'>操作</th>
        </tr>
        </thead>
        <tbody>
        {itemList}
        </tbody>
      </table>
    </div>
  )
}
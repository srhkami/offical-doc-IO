import {type Dispatch, type SetStateAction} from 'react';
import {FaPlusCircle} from "react-icons/fa";
import {BsFillSendPlusFill} from "react-icons/bs";
import OptionsGroup from "@/old/tools/OptionsGroup.tsx";
import OptionsUser from "@/old/tools/OptionsUser.tsx";
import {useAxios, useModal} from '@/hooks';
import type {DocOutDetail} from '@/types/doc-types';
import {type SubmitHandler, useForm} from 'react-hook-form';
import {ROOT_IP} from "@/utils/info.ts";
import {showToast} from "@/utils/handleToast.ts";
import {getDate} from '@/utils/getDate';
import {Button, Col, FormInputCol, Modal, ModalBody, ModalHeader, Row} from "@/component";

type Props = {
  readonly setReLoad: Dispatch<SetStateAction<boolean>>,
}

export default function ModalAddOut({setReLoad}: Props) {

  const api = useAxios();
  const {isShow, onShow, onHide} = useModal();

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  }
    = useForm<DocOutDetail>();

  const onAdd = async () => {
    const res = await api({
      method: 'get',
      url: ROOT_IP + '/doc/get_number/',
      params: {ym: getDate().ym},
    })
    return res.data
  }

  const onSubmit: SubmitHandler<DocOutDetail> = (formData) => {
    // 取得送文號
    const SendNumber = onAdd();
    formData.number = Number(SendNumber)
    showToast(
      api({
        method: 'post',
        url: ROOT_IP + '/doc/out/',
        data: formData,
      }), {success: '新增成功'}
    )
      .then(() => {
        setReLoad(prev => !prev);
        setValue('username', '');
        setValue('title', '');
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <Button color='primary' size='sm' onClick={onShow}>
        <FaPlusCircle className='me-1 my-auto'/>
        新增
      </Button>
      <Modal isShow={isShow} onHide={onHide} backdrop={false} closeButton>
        <ModalHeader divider>
          <BsFillSendPlusFill className='i-12 me-2' color='#3B71CA'/>
          <h4 className='fw-bolder text-primary my-auto'>新增送文</h4>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <FormInputCol xs={6} label='陳報日期' error={errors.reportDate?.message}>
                <input
                  className='input input-sm w-full'
                  type='date'
                  defaultValue={getDate().today}
                  {...register('reportDate', {required: '請填寫此欄位'})}
                />
              </FormInputCol>

              <FormInputCol xs={6} label='送文號' error={errors.number?.message}>
                <input
                  className='input input-sm w-full'
                  type='text'
                  placeholder='儲存後會自動取號'
                  readOnly
                  {...register('number')}
                />
              </FormInputCol>

              <FormInputCol xs={6} label='送文號' error={errors.number?.message}>
                <input
                  className='input input-sm w-full'
                  type='text'
                  placeholder='儲存後會自動取號'
                  readOnly
                  {...register('number')}
                />
              </FormInputCol>
              <FormInputCol xs={6} label='組別' error={errors.groupName?.message}>
                <select className='select select-sm w-full'
                        {...register('groupName', {required: '請選擇此欄位'})}>
                  {/*這個選項應該要動態刷新才對*/}
                  <OptionsGroup/>
                </select>
              </FormInputCol>
              <FormInputCol xs={6} label='承辦人' error={errors.groupName?.message}>
                <select className='select select-sm w-full'
                        {...register('username', {required: '請選擇此欄位'})}>
                  <OptionsUser/>
                </select>
              </FormInputCol>
              <FormInputCol xs={12} label='主旨' error={errors.number?.message}>
                <input
                  className='input input-sm w-full'
                  type='text'
                  placeholder='請輸入陳報主旨'
                  {...register('title', {required: '請填寫此欄位'})}
                />
              </FormInputCol>
            </Row>
            <Col xs={12}>
              <Button type='submit' color='success' size='sm' shape='block'>
                新增
              </Button>
            </Col>
          </form>
        </ModalBody>
      </Modal>
    </>
  )
}
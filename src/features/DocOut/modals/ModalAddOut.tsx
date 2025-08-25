import {type Dispatch, type SetStateAction} from 'react';
import {useAxios, useModal} from '@/hooks';
import type {DocOutDetail} from '@/types/doc-types';
import {type SubmitHandler, useForm} from 'react-hook-form';
import {ROOT_IP} from "@/utils/info.ts";
import {showToast} from "@/utils/handleToast.ts";
import {getDate} from '@/utils/getDate';
import {BottomButton, Button, Col, FormInputCol, Modal, ModalBody, ModalHeader, ModalTitle, Row} from "@/component";
import {IoMdAdd} from "react-icons/io";
import {OptionsGroup, OptionsUser} from "@/features";
import {showFormError} from "@/utils/handleFormErrors.ts";


type Props = {
  readonly setReload: Dispatch<SetStateAction<boolean>>,
}

/**
 * 用來新增送文的對話框
 * @param setReload
 * @constructor
 */
export default function ModalAddOut({setReload}: Props) {

  const api = useAxios();
  const {isShow, onShow, onHide} = useModal();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: {errors},
  }
    = useForm<DocOutDetail>();

  const getNumber = async () => {
    const res = await api({
      method: 'GET',
      url: ROOT_IP + '/doc/get_number/',
      params: {ym: getDate().ym},
    })
    return Number(res.data)
  }

  const onSubmit: SubmitHandler<DocOutDetail> = async (formData) => {
    // 取得送文號
    formData.number = await getNumber();
    showToast(
      api({
        method: 'POST',
        url: ROOT_IP + '/doc/out/',
        data: formData,
      }), {success: '新增成功'}
    )
      .then(() => {
        setReload(prev => !prev);
        setValue('username', '');
        setValue('title', '');
      })
      .catch(err => showFormError(err, setError))
  }

  return (
    <>
      <BottomButton color='primary' style='soft' onClick={onShow} label='新增'>
        <IoMdAdd className='text-xl'/>
      </BottomButton>
      <Modal isShow={isShow} onHide={onHide} backdrop={false} closeButton>
        <ModalHeader divider>
          <ModalTitle>
            新增送文
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <FormInputCol xs={6} label='陳報日期' error={errors.reportDate?.message}>
                <input
                  className='input w-full'
                  type='date'
                  defaultValue={getDate().today}
                  {...register('reportDate', {required: '請填寫此欄位'})}
                />
              </FormInputCol>
              <FormInputCol xs={6} label='送文號' error={errors.number?.message}>
                <input
                  className='input w-full'
                  type='text'
                  placeholder='儲存後會自動取號'
                  readOnly
                  {...register('number')}
                />
              </FormInputCol>
              <FormInputCol xs={6} label='組別' error={errors.groupName?.message}>
                <select className='select w-full'
                        {...register('groupName', {required: '請選擇此欄位'})}>
                  {/*這個選項應該要動態刷新才對*/}
                  <OptionsGroup/>
                </select>
              </FormInputCol>
              <FormInputCol xs={6} label='承辦人' error={errors.groupName?.message}>
                <select className='select w-full'
                        {...register('username', {required: '請選擇此欄位'})}>
                  <OptionsUser/>
                </select>
              </FormInputCol>
              <FormInputCol xs={12} label='主旨' error={errors.number?.message}>
                <input
                  className='input w-full'
                  type='text'
                  placeholder='請輸入陳報主旨'
                  {...register('title', {required: '請填寫此欄位'})}
                />
              </FormInputCol>
            </Row>
            <Col xs={12} className='mt-6'>
              <Button type='submit' color='success' shape='block'>
                新增
              </Button>
            </Col>
          </form>
        </ModalBody>
      </Modal>
    </>
  )
}
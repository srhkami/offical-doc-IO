import {type Dispatch, type SetStateAction} from 'react';
import {type SubmitHandler, useForm} from "react-hook-form";
import {getDate} from "@/utils/getDate.ts";
import {useAxios, useModal} from "@/hooks";
import {showToast} from "@/utils/handleToast.ts";
import type {DocInDetail} from "@/types/doc-types.ts";
import {ROOT_IP} from '@/utils/info';
import {BottomButton, Button, Col, FormInputCol, Modal, ModalBody, ModalHeader, ModalTitle, Row} from "@/component";
import {IoMdAdd} from "react-icons/io";
import {OptionsGroup} from "@/features";

type Props = {
  readonly setReload: Dispatch<SetStateAction<boolean>>,
}

/* 新增收文的對話框 */
export default function ModalAddIn({setReload}: Props) {

  const api = useAxios();
  const {isShow, onShow, onHide} = useModal()

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  }
    = useForm<DocInDetail>();

  const onSubmit: SubmitHandler<DocInDetail> = (formData) => {
    formData['receiveDate'] = getDate().today;

    showToast(
      api({
        method: 'post',
        url: ROOT_IP + '/doc/in/',
        data: formData,
      }),
      {success: '新增成功',}
    )
      .then(() => {
        setReload(prev => !prev);
        reset();
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <BottomButton color='primary' style='soft' onClick={onShow}>
        <IoMdAdd className='text-xl'/>
      </BottomButton>
      <Modal isShow={isShow} onHide={onHide} backdrop={false} closeButton>
        <ModalHeader divider>
          <ModalTitle>
            新增收文
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <FormInputCol xs={6} label='組別' error={errors.groupName?.message}>
                <select className='select w-full' {...register('groupName', {required: '請選擇此欄位'})}>
                  <OptionsGroup/>
                </select>
              </FormInputCol>
              <FormInputCol xs={6} label='發文字號' error={errors.number?.message}>
                <input
                  className='input w-full'
                  type='text'
                  placeholder='填末五碼，或公文種類'
                  {...register('number', {required: '請填寫此欄位', maxLength: {value: 16, message: '上限16個字'}})}
                />
              </FormInputCol>
              <FormInputCol xs={12} label='主旨' error={errors.title?.message}>
                <input
                  className='input w-full'
                  type='text'
                  placeholder='請輸入公文主旨'
                  {...register('title', {required: '請填寫此欄位'})}
                />
              </FormInputCol>
              <Col xs={12} className='mt-6'>
                <Button type='submit' color='success' shape='block'>
                  新增
                </Button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </>
  )
}
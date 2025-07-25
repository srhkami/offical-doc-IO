import React, {Dispatch, SetStateAction, useState,} from 'react';
import {Col, Form, Modal} from "react-bootstrap";
import {MDBBtn} from "mdb-react-ui-kit";
import {FaPlusCircle} from "react-icons/fa";
import {SubmitHandler, useForm} from "react-hook-form";
import {BsEnvelopePlusFill} from "react-icons/bs";
import {ROOT_IP} from "../../../utils/info.tsx";
import {getDate} from "../../tools/getDate.js";
import {useAxios} from "../../../utils/useAxios.ts";
import toast from "react-hot-toast";
import {DocInDetail} from "../../../utils/types.ts";

type Props = {
  readonly setLoading: Dispatch<SetStateAction<boolean>>,
}

/* 新增收文的對話框 */
export default function ModalAddIn({setLoading}: Props) {

  const api = useAxios();

  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  }
    = useForm<DocInDetail>();

  const onSubmit: SubmitHandler<DocInDetail> = (formData) => {
    formData['receiveDate'] = getDate().today;
    setLoading(true);
    toast.promise(
      api({
        method: 'post',
        url: ROOT_IP + '/doc/in/',
        data: formData,
      }),
      {
        loading:'處理中...',
        success:'新增成功',
        error:'處理失敗，請重試'
      }
    )
    .then(() => {
      setLoading(prev => !prev);
      reset();
    })
      .catch(err => console.log(err))
  }

  return (
    <>
      <MDBBtn color='primary' size='sm' className='ms-2 my-auto d-flex' onClick={handleModalShow}>
        <FaPlusCircle className='me-1 my-auto'/>
        新增
      </MDBBtn>
      <Modal show={modalShow} onHide={handleModalClose} backdrop="static">
        <Modal.Header closeButton>
          <BsEnvelopePlusFill className='i-12 me-2' color='#3B71CA'/>
          <h4 className='fw-bolder text-primary my-auto'>新增收文</h4>
        </Modal.Header>
        <Modal.Body>
          <Form className='row' onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='col-6 mb-3'>
              <Form.Label>組別：</Form.Label>
              <select className='form-select' {...register('groupName', {required: '請選擇此欄位'})}>
                {/*這個選項應該要動態刷新才對*/}
                <option value="">請選擇</option>
                <option value="一組">一組</option>
                <option value="二組">二組</option>
                <option value="三組">三組</option>
                <option value="四組">四組</option>
                <option value="五組">五組</option>
                <option value="偵查隊">偵查隊</option>
                <option value="勤務中心">勤務中心</option>
              </select>
              <span className='text-danger f-07 fw-bolder'>{errors.groupName?.message}</span>
            </Form.Group>
            <Form.Group className='col-6 mb-3'>
              <Form.Label>發文字號：</Form.Label>
              <input
                className='form-control'
                type='text'
                placeholder='填末五碼，或公文種類'
                {...register('number', {required: '請填寫此欄位', maxLength: {value: 16, message: '上限16個字'}})}
              />
              <span className='text-danger f-07 fw-bolder'>{errors.number?.message}</span>
            </Form.Group>
            <Form.Group className='col-12 mb-3'>
              <Form.Label>主旨：</Form.Label>
              <input
                className='form-control'
                type='text'
                placeholder='請輸入公文主旨'
                {...register('title', {required: '請填寫此欄位'})}
              />
              <span className='text-danger f-07 fw-bolder'>{errors.title?.message}</span>
            </Form.Group>
            <Col xs='12' className='d-flex'>
              <MDBBtn type='submit' className='ms-auto'>
                確定新增
              </MDBBtn>
            </Col>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
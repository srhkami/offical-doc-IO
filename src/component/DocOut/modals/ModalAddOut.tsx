import {useState,} from 'react';
import {Col, Form, Modal} from "react-bootstrap";
import {MDBBtn} from "mdb-react-ui-kit";
import {FaPlusCircle} from "react-icons/fa";
import {SubmitHandler, useForm} from "react-hook-form";
import {BsFillSendPlusFill} from "react-icons/bs";
import {ROOT_IP} from "../../../utils/info.tsx";
import {getDate} from "../../tools/getDate";
import OptionsGroup from "../../tools/OptionsGroup.js";
import OptionsUser from "../../tools/OptionsUser.js";
import {useAxios} from "../../../utils/useAxios.ts";
import {DocOutDetail} from "../../../utils/types.ts";
import toast from "react-hot-toast";
import {handleError} from "../../../utils/handleError.ts";

type Props = {
  readonly setIsLoading: (value: boolean) => void,
}

export default function ModalAddOut({setIsLoading}: Props) {

  const api = useAxios();

  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  }
    = useForm<DocOutDetail>();

  const onSubmit: SubmitHandler<DocOutDetail> = (formData) => {
    setIsLoading(true);
    toast.loading('處理中，請稍候...')
    // 取得送文號
    api({
      method: 'get',
      url: ROOT_IP + '/doc/get_number/',
      params: {ym: getDate().ym},
    })
      .then(res => {
          formData.number = Number(res.data); // 取得送文號
          // 新增文章
          api({
            method: 'post',
            url: ROOT_IP + '/doc/out/',
            data: formData,
            withCredentials: true,
          })
            .then(() => {
              toast.dismiss();
              toast.success('新增成功');
              setIsLoading(false);
              setValue('username', '');
              setValue('title', '');
            })
            .catch(err => {
              toast.dismiss();
              setIsLoading(false);
              handleError(err, '新增失敗')
            })
        }
      )
      .catch(err => {
        toast.dismiss();
        setIsLoading(false);
        handleError(err, '取得送文號失敗')
      })
  }

  return (
    <>
      <MDBBtn color='primary' size='sm' className='ms-2 my-auto d-flex' onClick={handleModalShow}>
        <FaPlusCircle className='me-1 my-auto'/>
        新增
      </MDBBtn>
      <Modal show={modalShow} onHide={handleModalClose} backdrop="static">
        <Modal.Header closeButton>
          <BsFillSendPlusFill className='i-12 me-2' color='#3B71CA'/>
          <h4 className='fw-bolder text-primary my-auto'>新增送文</h4>
        </Modal.Header>
        <Modal.Body>
          <Form className='row' onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='col-6 mb-3'>
              <Form.Label>陳報日期：</Form.Label>
              <input
                className='form-control'
                type='date'
                defaultValue={getDate().today}
                {...register('reportDate', {required: '請填寫此欄位'})}
              />
              <span className='text-danger f-07 fw-bolder'>{errors.reportDate?.message}</span>
            </Form.Group>
            <Form.Group className='col-6 mb-3'>
              <Form.Label>送文號：</Form.Label>
              <input
                className='form-control'
                type='text'
                placeholder='儲存後會自動取號'
                readOnly
                {...register('number')}
              />
            </Form.Group>
            <Form.Group className='col-6 mb-3'>
              <Form.Label>組別：</Form.Label>
              <select className='form-select' {...register('groupName', {required: '請選擇此欄位'})}>
                {/*這個選項應該要動態刷新才對*/}
                <OptionsGroup/>
              </select>
              <span className='text-danger f-07 fw-bolder'>{errors.groupName?.message}</span>
            </Form.Group>
            <Form.Group className='col-6 mb-3'>
              <Form.Label>承辦人：</Form.Label>
              <select className='form-select' {...register('username', {required: '請選擇此欄位'})}>
                <OptionsUser/>
              </select>
              <span className='text-danger f-07 fw-bolder'>{errors.username?.message}</span>
            </Form.Group>
            <Form.Group className='col-12 mb-3'>
              <Form.Label>主旨：</Form.Label>
              <input
                className='form-control'
                type='text'
                placeholder='請輸入陳報主旨'
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
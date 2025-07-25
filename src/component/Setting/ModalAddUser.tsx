import {useState,} from 'react';
import {Col, Form, Modal} from "react-bootstrap";
import {MDBBtn} from "mdb-react-ui-kit";
import {FaPlusCircle} from "react-icons/fa";
import {SubmitHandler, useForm} from "react-hook-form";
import {ROOT_IP} from "../../utils/info.tsx";
import {FaUserPlus} from "react-icons/fa";
import {useAxios} from "../../utils/useAxios.ts";
import {UserDetail} from "../../utils/types.ts";
import toast from "react-hot-toast";
import {handleError} from "../../utils/handleError.ts";

export default function ModalAddUser({setIsLoading}) {

  const api = useAxios();

  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
  }
    = useForm<UserDetail>();

  const onSubmit:SubmitHandler<UserDetail> = (formData) => {
    toast.loading('處理中，請稍候...')
    setIsLoading(true);
    api({
      method: 'post',
      url: ROOT_IP + '/doc/users/',
      data: formData,
    }).then(() => {
      toast.dismiss();
      toast.success('新增成功')
      setIsLoading(false);
      handleModalClose();
    })
      .catch(err => {
        handleError(err);
        setIsLoading(false);
      })
  }

  return (
    <>
      <MDBBtn size='sm' className='my-auto d-flex ms-auto' onClick={handleModalShow}>
        <FaPlusCircle className='me-1 my-auto'/>
        新增
      </MDBBtn>
      <Modal show={modalShow} onHide={handleModalClose} backdrop="static">
        <Modal.Header closeButton>
          <FaUserPlus className='i-12 me-2' color='#3B71CA'/>
          <h4 className='fw-bolder text-primary my-auto'>新增承辦人</h4>
        </Modal.Header>
        <Modal.Body>
          <Form className='row' onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='col-6 mb-3'>
              <Form.Label>姓名：</Form.Label>
              <input
                className='form-control'
                type='text'
                placeholder=''
                {...register('name', {required: '請填寫此欄位', maxLength: {value: 16, message: '上限16個字'}})}
              />
              <span className='text-danger f-07 fw-bolder'>{errors.name?.message}</span>
            </Form.Group>
            <Form.Group className='col-6 mb-3'>
              <Form.Label>勤區：</Form.Label>
              <input
                className='form-control'
                type='number'
                placeholder=''
                {...register('area', {required: '請填寫此欄位'})}
              />
              <span className='text-danger f-07 fw-bolder'>{errors.area?.message}</span>
            </Form.Group>
            <Form.Group className='col-12 mb-3'>
              <Form.Label>業務內容/勤區範圍：</Form.Label>
              <textarea
                className='form-control'
                {...register('workContent', {required: '請填寫此欄位'})}
              />
              <span className='text-danger f-07 fw-bolder'>{errors.workContent?.message}</span>
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

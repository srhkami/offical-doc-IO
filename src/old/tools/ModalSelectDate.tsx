import {useState,} from 'react';
import {Col, Form, Modal} from "react-bootstrap";
import {MDBBtn} from "mdb-react-ui-kit";
import {SubmitHandler, useForm} from "react-hook-form";
import {getDate} from "../../utils/getDate.js";
import {IoMdPrint} from "react-icons/io";
import {useNavigate} from "react-router";


export default function ModalSelectDate({mode='out'}) {

  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

  const {
    register,
    handleSubmit,
  }
    = useForm<{sendDate:string}>();

  const onSubmit:SubmitHandler<{sendDate:string}> = (formDate) => {
    if (mode === 'out'){
      navigate('/out/print/' + formDate.sendDate);
    }else {
      navigate('/in/print/' + formDate.sendDate);
    }

  }

  return (
    <>
      <MDBBtn className='ms-3 d-flex' size='sm' onClick={handleModalShow}>
        <IoMdPrint className='me-1 i-12 my-auto'/>
        {mode === 'out'? '列印歷史送文簿' : '列印歷史收文簿'}
      </MDBBtn>
      <Modal show={modalShow} onHide={handleModalClose} size='sm'>
        <Modal.Body>
          <Form className='row' onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='col-8'>
              <Form.Label>請選擇收送文日期：</Form.Label>
              <input
                className='form-control'
                type='date'
                defaultValue={getDate().today}
                {...register('sendDate', {required: true})}
              />
            </Form.Group>
            <Col xs='4' className='d-flex'>
              <MDBBtn type='submit' className='mt-auto ms-auto'>
                查詢
              </MDBBtn>
            </Col>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
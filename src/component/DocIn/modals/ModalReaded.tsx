import React, {Dispatch, SetStateAction, useState} from 'react';
import {Alert, Modal} from "react-bootstrap";
import {MDBBtn} from "mdb-react-ui-kit";
import {ROOT_IP} from "../../../utils/info.tsx";
import {FaCheckCircle} from "react-icons/fa";
import {useAxios} from "../../../utils/useAxios.ts";
import toast from "react-hot-toast";

type Props = {
  readonly setLoading: Dispatch<SetStateAction<boolean>>,
}

/* 批閱公文的對話框 */
export default function ModalReaded({setLoading}: Props) {

  const api = useAxios();

  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

  function handleRead() {
    toast.promise(
      api({
        method: 'POST',
        url: ROOT_IP + '/doc/read_doc/',
        withCredentials: true,
      }),
      {
        loading: '處理中...',
        success: '批閱成功',
        error: '處理失敗，請重試',
      }
    )
      .then(() => {
        handleModalClose();
        setLoading(prev => !prev);
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <MDBBtn color='success' size='sm' className='ms-auto my-auto d-flex' onClick={handleModalShow}>
        <FaCheckCircle className='me-1 i-10 my-auto'/>
        完成批閱
      </MDBBtn>
      <Modal show={modalShow} onHide={handleModalClose}>
        <Alert variant='info' className='m-0'>
          <Alert.Heading>是否完成批閱？</Alert.Heading>
          <p>批閱後已分派的公文將存檔無法修改。
            <br/>未分派的公文不受影響。</p>
          <hr/>
          <div className='d-flex justify-content-end'>
            <MDBBtn color="success" className='me-2' onClick={handleRead}>完成批閱</MDBBtn>
            <MDBBtn color="secondary" onClick={handleModalClose}>取消</MDBBtn>
          </div>
        </Alert>
      </Modal>
    </>
  )
}
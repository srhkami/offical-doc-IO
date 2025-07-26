import React, {Dispatch, SetStateAction, useState} from 'react';
import {Alert, Modal} from "react-bootstrap";
import {MDBBtn} from "mdb-react-ui-kit";
import {ROOT_IP} from "../../../utils/info.ts";
import {useAxios} from "../../../utils/useAxios.ts";
import {MdDeleteForever} from "react-icons/md";
import toast from "react-hot-toast";
import {handleError} from "../../../utils/handleError.ts";

type Props = {
  readonly id: number,
  readonly setIsLoading: Dispatch<SetStateAction<boolean>>,
}

export default function ModalRevoke({id, setIsLoading}: Props) {
  // 用來撤銷送文

  const api = useAxios();

  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

  function handleRevoke() {
    toast.loading('處理中，請稍候...')
    setIsLoading(true);
    api({
      method: 'PATCH',
      url: ROOT_IP + '/doc/out/' + id + '/',
      data: {
        status: 2,
      },
    }).then(() => {
      toast.dismiss();
      toast.success('撤銷成功')
      setIsLoading(false);
      setModalShow(false);
    }).catch(err => {
      setIsLoading(false);
      handleError(err);
    })
  }

  return (
    <>
      <MDBBtn color='danger' outline size='sm' className='d-flex ms-1' onClick={handleModalShow}>
        <MdDeleteForever className='i-15 my-auto'/>
      </MDBBtn>
      {modalShow &&
        <Modal show={modalShow} onHide={handleModalClose}>
          <Alert variant='info' className='m-0'>
            <Alert.Heading>是否撤銷此公文？</Alert.Heading>
            <p>若此公文無法送出，請點此撤銷。
              <br/>若想重新送出原公文，請重新取號</p>
            <hr/>
            <div className='d-flex justify-content-end'>
              <MDBBtn color="danger" className='me-2' onClick={handleRevoke}>確定撤銷</MDBBtn>
              <MDBBtn color="secondary" onClick={handleModalClose}>取消</MDBBtn>
            </div>
          </Alert>
        </Modal>
      }
    </>
  )
}
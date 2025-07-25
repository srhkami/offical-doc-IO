import React, {useState} from 'react';
import {Modal, Alert} from "react-bootstrap";
import {MDBBtn} from "mdb-react-ui-kit";
import {BsFillSendArrowUpFill} from "react-icons/bs";
import {getDate} from "../../tools/getDate.js";
import {ROOT_IP} from "../../../utils/info.tsx";
import {useNavigate} from "react-router";
import {useAxios} from "../../../utils/useAxios.ts";
import toast from "react-hot-toast";
import {handleError} from "../../../utils/handleError.ts";

export default function ModalSendOut({setIsLoading}) {

  const api = useAxios();

  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);
  const navigate = useNavigate();

  function handleSendDoc() {
    toast.loading('處理中，請稍候...')
    setIsLoading(true);
    // 確認送出公文
    const today = getDate().today;
    api({
      method: 'POST',
      url: ROOT_IP + '/doc/send_doc/',
      data: {
        "sendDate": today,
      },
      withCredentials: true,
    })
      .then(() => {
        toast.dismiss();
        toast.success('送出成功');
        setIsLoading(false);
        navigate('/out/print/' + today);
      })
      .catch(err => {
        setModalShow(false);
        setIsLoading(false);
        if (err.response.status === 404) {
          handleError(err, '沒有任何待送公文');
        } else {
          handleError(err);
        }
      })
  }

  return (
    <>
      <MDBBtn color='success' className='ms-auto d-flex' size='sm' onClick={handleModalShow}>
        <BsFillSendArrowUpFill className='me-1 my-auto'/>
        送出公文
      </MDBBtn>
      <Modal show={modalShow} onHide={handleModalClose}>
        <Alert variant='info' className='m-0'>
          <Alert.Heading>
            <span className='fw-bolder'>是否確定送出並列印今日送文簿？</span>
          </Alert.Heading>
          <p className='m-2'>
            送公文流程：
          </p>
          <ol className=''>
            <li>輸入所有待送公文</li>
            <li>使用電腦版網頁送出並列印</li>
            <li>如需重新列印，請至「送文紀錄→列印歷史送文簿」</li>
          </ol>
          <hr/>
          <div className='d-flex justify-content-end'>
            <MDBBtn color='success' className='me-2' onClick={handleSendDoc}>確認送出</MDBBtn>
            <MDBBtn color="secondary" onClick={handleModalClose}>取消</MDBBtn>
          </div>
        </Alert>
      </Modal>
    </>
  )
}
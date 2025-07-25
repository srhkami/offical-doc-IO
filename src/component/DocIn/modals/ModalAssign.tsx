import {MDBBtn} from "mdb-react-ui-kit";
import React, {Dispatch, SetStateAction, useState} from "react";
import {Col, Modal, Row} from "react-bootstrap";
import {getDate} from "../../tools/getDate.js";
import {ROOT_IP} from "../../../utils/info.tsx";
import {TbCopy, TbCopyCheckFilled} from "react-icons/tb";
import {useAxios} from "../../../utils/useAxios.ts";
import toast from "react-hot-toast";
import {UserDetail} from "../../../utils/types.ts";
import CardUser from "../../tools/CardUser.tsx";
import {FaCircleArrowRight} from "react-icons/fa6";

type Props = {
  readonly id: number,
  readonly userData: Array<UserDetail>,
  readonly setLoading: Dispatch<SetStateAction<boolean>>,
  readonly username: string,
}

/* 分派承辦人的對話框 */
export default function ModalAssign({id, userData, setLoading, username}: Props) {

  const api = useAxios();

  const [modalShow, setModalShow] = useState(false);
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);


  const handleAssign = (username) => {
    toast.promise(
      api({
        method: 'PATCH',
        url: ROOT_IP + `/doc/in/${id}/`,
        data: {
          username: username,
          readDate: getDate().today,
        },
      }),
      {
        loading: '處理中...',
        success: '分派成功',
        error: '處理失敗，請重試',
      }
    )
      .then(() => {
        setLoading(prev => !prev);
        setModalShow(false);
      })
      .catch(err => console.log(err))
  }

  const cardList = userData.map(obj => {
    return (
      <Col xs={12} key={obj.id} className='my-1'>
        <CardUser
          obj={obj}
          header={
            <MDBBtn className='d-flex ms-auto my-auto' color='success' outline onClick={() => {
              handleAssign(obj.name)
            }}>
              <div className='my-auto'>選擇</div>
              <FaCircleArrowRight className='my-auto ms-2'/>
            </MDBBtn>
          }
        />
      </Col>
    )
  })


  return (
    <>
      <MDBBtn size='sm' outline className='mb-auto d-flex' color={username ? 'success' : 'warning'}
              onClick={handleModalShow}>
        {username ? <TbCopyCheckFilled className='i-12 me-1 my-auto'/> : <TbCopy className='i-12 me-1 my-auto'/>}
        {username || '待指派'}
      </MDBBtn>
      <Modal show={modalShow} onHide={handleModalClose} scrollable>
        <Modal.Header closeButton>
          <h4 className='fw-bolder text-primary my-auto'>指派承辦人</h4>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {cardList}
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

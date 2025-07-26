import {type Dispatch, type SetStateAction} from "react";
import {getDate} from "@/utils/getDate.ts";
import {TbCopy, TbCopyCheckFilled} from "react-icons/tb";
import {FaCircleArrowRight} from "react-icons/fa6";
import type {UserDetail} from "@/types/doc-types.ts";
import {useAxios, useModal} from "@/hooks";
import {showToast} from "@/utils/handleToast.ts";
import {ROOT_IP} from "@/utils/info.ts";
import {Button, Modal, ModalBody, ModalHeader, ModalTitle} from "@/component";
import {UserCard} from "@/features";

type Props = {
  readonly id: number,
  readonly userData: Array<UserDetail>,
  readonly setReload: Dispatch<SetStateAction<boolean>>,
  readonly username: string,
}

/**
 * 分派承辦人的對話框
 * @param id
 * @param userData
 * @param setLoading
 * @param username
 * @constructor
 */
export default function ModalAssign({id, userData, setReload, username}: Props) {

  const api = useAxios();
  const {isShow, onShow, onHide} = useModal()

  const onAssign = (newUsername: string) => {
    showToast(
      api({
        method: 'PATCH',
        url: ROOT_IP + `/doc/in/${id}/`,
        data: {
          username: newUsername,
          readDate: getDate().today,
        },
      }),
      {success: '分派成功'}
    )
      .then(() => {
        setReload(prev => !prev);
      })
      .catch(err => console.log(err))
      .finally(() => onHide())
  }

  const cardList = userData.map(user => {
    return (
      <li key={user.id} className='my-1'>
        <UserCard
          user={user}
          header={
            <Button color='success' size='sm' style='outline' onClick={() => {
              onAssign(user.name)
            }}>
              <div className='my-auto'>選擇</div>
              <FaCircleArrowRight className='my-auto ms-2'/>
            </Button>
          }
        />
      </li>
    )
  })


  return (
    <>
      <Button size='sm' style='outline' color={username ? 'success' : 'warning'}
              onClick={onShow}>
        {username ? <TbCopyCheckFilled className='i-12 me-1 my-auto'/> : <TbCopy className='i-12 me-1 my-auto'/>}
        {username || '待指派'}
      </Button>
      <Modal isShow={isShow} onHide={onHide} closeButton>
        <ModalHeader divider>
          <ModalTitle>
            指派承辦人
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <ul className='list'>
            {cardList}
          </ul>
        </ModalBody>
      </Modal>
    </>
  );
}

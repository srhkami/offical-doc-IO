import {type Dispatch, type SetStateAction} from 'react';
import {MdDeleteForever} from "react-icons/md";
import {useAxios, useModal} from "@/hooks";
import {Button, Modal, ModalBody, ModalTitle} from "@/component";
import {ROOT_IP} from "@/utils/info.ts";
import {showToast} from "@/utils/handleToast.ts";

type Props = {
  readonly id: number,
  readonly setReload: Dispatch<SetStateAction<boolean>>,
}

/**
 * 用來撤銷送文的對話框
 * @param id
 * @param setReload
 * @constructor
 */
export default function ModalRevoke({id, setReload}: Props) {

  const api = useAxios();
  const {isShow, onShow, onHide} = useModal();

  function onRevoke() {
    showToast(
      api({
        method: 'PATCH',
        url: ROOT_IP + '/doc/out/' + id + '/',
        data: {
          status: 2,
        },
      })
    )
      .then(() => {
        setReload(prev => !prev);
        onHide()
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <Button color='error' shape='circle' style='ghost' size='sm' onClick={onShow}>
        <MdDeleteForever className='text-lg'/>
      </Button>
      <Modal isShow={isShow} onHide={onHide} closeButton className='border-2 border-error'>
        <ModalBody>
          <ModalTitle>
            是否撤銷此公文？
          </ModalTitle>
          <div className='my-4'>
            若此公文無法送出，請點此撤銷。
            <br/>
            若想重新送出原公文，請重新取號
          </div>
          <div className='flex justify-between gap-2'>
            <div className='w-full'>
              <Button size='sm' color='error' shape='block' onClick={onRevoke}>
                確定撤銷
              </Button>
            </div>
            <div className='w-full'>
              <Button size='sm' color='secondary' shape='block' onClick={onHide}>
                取消
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}
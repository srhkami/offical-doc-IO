import {MdDeleteForever} from "react-icons/md";
import type {Dispatch, SetStateAction} from "react";
import {Button, Modal, ModalBody, ModalTitle} from "@/component";
import {useAxios, useModal} from "@/hooks";
import {showToast} from "@/utils/handleToast.ts";
import {ROOT_IP} from "@/utils/info.ts";

type Props = {
  readonly id: number,
  readonly setReload: Dispatch<SetStateAction<boolean>>,
}

/**
 * 用來刪除送文的對話框
 * @param id
 * @param setLoading
 * @constructor
 */
export default function ModalRemove({id, setReload}: Props) {

  const api = useAxios();
  const {isShow, onShow, onHide} = useModal();

  const onRemove = () => {
    showToast(
      api({
        method: 'DELETE',
        url: ROOT_IP + '/doc/in/' + id + '/',
      }),
      {success: '刪除成功',}
    )
      .then(() => setReload(prev => !prev))
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
            是否刪除此公文？
          </ModalTitle>
          <div className='my-4'>
            此操作無法復原
          </div>
          <div className='flex justify-between gap-2'>
            <div className='w-full'>
              <Button size='sm' color='error' shape='block' onClick={onRemove}>
                確定刪除
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
import {type Dispatch, type SetStateAction} from 'react';
import {useAxios, useModal} from "@/hooks";
import {BottomMainButton, Button, Modal, ModalTitle} from "@/component";
import {BsSendCheckFill} from "react-icons/bs";
import {showToast} from "@/utils/handleToast.ts";
import {ROOT_IP} from "@/utils/info.ts";

type Props = {
  readonly setReload: Dispatch<SetStateAction<boolean>>,
}

/* 批閱公文的對話框 */
export default function ModalRead({setReload}: Props) {

  const api = useAxios();

  const {isShow, onShow, onHide} = useModal();

  const onSubmit = () => {
    showToast(
      api({
        method: 'POST',
        url: ROOT_IP + '/doc/read_doc/',
        withCredentials: true,
      }),
      {success: '批閱成功'}
    )
      .then(() => setReload(prev => !prev))
      .catch(err => console.log(err))
      .finally(() => onHide())
  }

  return (
    <>
      <BottomMainButton color='success' label='完成批閱'
                        onClick={onShow}>
        <BsSendCheckFill className='text-xl'/>
      </BottomMainButton>
      <Modal isShow={isShow} onHide={onHide} closeButton className='border-2 border-success'>
        <ModalTitle>
          是否完成批閱？
        </ModalTitle>
        <div className='my-4'>
          批閱後已分派的公文將存檔無法修改。
          <br/>未分派的公文不受影響。
        </div>
        <div className='flex justify-between gap-2'>
          <div className='w-full'>
            <Button size='sm' color='success' shape='block' onClick={onSubmit}>
              完成批閱
            </Button>
          </div>
          <div className='w-full'>
            <Button size='sm' color='secondary' shape='block' onClick={onHide}>
              取消
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
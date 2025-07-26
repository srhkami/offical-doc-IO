import {type Dispatch, type SetStateAction} from 'react';
import {getDate} from "@/utils/getDate.js";
import {useNavigate} from "react-router";
import {useAxios, useModal} from "@/hooks";
import {showToast} from "@/utils/handleToast.ts";
import {ROOT_IP} from '@/utils/info';
import {BottomMainButton, Button, Modal, ModalTitle} from "@/component";
import { BsSendCheckFill } from "react-icons/bs";

type Props = {
  readonly setReload: Dispatch<SetStateAction<boolean>>,
}

export function ModalSendOut({setReload}: Props) {

  const api = useAxios();
  const {isShow, onShow, onHide} = useModal();
  const navi = useNavigate();

  // 送出公文
  const onSend = () => {
    const today = getDate().today;
    showToast(
      api({
        method: 'POST',
        url: ROOT_IP + '/doc/send_doc/',
        data: {
          "sendDate": today,
        },
        withCredentials: true,
      }),
      {
        success: '送出成功',
        error: (err) => err.response.data.detail,
      }
    )
      .then(() => {
        setReload(prev => !prev)
        navi('/out/print/' + today);
      })
      .catch(err => console.log(err))
      .finally(() => onHide())
  }

  return (
    <>
      <BottomMainButton color='success' title='送出公文'
                        onClick={onShow}>
        <BsSendCheckFill className='text-xl'/>
      </BottomMainButton>
      <Modal isShow={isShow} onHide={onHide} closeButton className='border-2 border-success'>
        <ModalTitle>
          是否送出並列印今日送文簿？
        </ModalTitle>
        <div className='my-4'>
          <p>
            送公文流程：
          </p>
          <ol className='list-decimal pl-4'>
            <li>輸入所有待送公文</li>
            <li>使用電腦版網頁送出並列印</li>
            <li>如需重新列印，請至「送文紀錄→列印歷史送文簿」</li>
          </ol>
        </div>
          <div className='flex justify-between gap-2'>
            <div className='w-full'>
              <Button size='sm' color='success' shape='block' onClick={onSend}>
                確認送出
              </Button>
            </div>
            <div  className='w-full'>
              <Button size='sm' color='secondary' shape='block' onClick={onHide}>
                取消
              </Button>
            </div>
          </div>
      </Modal>
    </>
  )
}
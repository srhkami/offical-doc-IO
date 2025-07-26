import {MDBBtn} from "mdb-react-ui-kit";
import {ROOT_IP} from "../../../utils/info.tsx";
import {MdDeleteForever} from "react-icons/md";
import {useAxios} from "../../../utils/useAxios.ts";
import toast from "react-hot-toast";
import {Dispatch, SetStateAction} from "react";

type Props = {
  readonly id: number,
  readonly setLoading: Dispatch<SetStateAction<boolean>>,
}

/* 刪除貼文的對話框 */
export default function ModalRemove({id, setLoading}: Props) {

  const api = useAxios();

  const handleToast = () => {
    toast(t => (
      <div className='d-flex'>
        <div className='me-3 my-auto'>是否確定刪除？</div>
        <MDBBtn className='me-2 my-auto' size='sm' color='danger' onClick={handleRemove}>刪除</MDBBtn>
        <MDBBtn className='my-auto' size='sm' color='secondary' onClick={() => toast.dismiss(t.id)}>取消</MDBBtn>
      </div>
    ))
  }

  function handleRemove() {
    toast.promise(
      api({
        method: 'DELETE',
        url: ROOT_IP + '/doc/in/' + id + '/',
      }),
      {
        loading: '處理中...',
        success: '刪除成功',
        error: '處理失敗，請重試'
      }
    )
      .then(() => setLoading(prev => !prev))
      .catch(err => console.log(err))
  }

  return (
    <MDBBtn color='danger' size='sm' outline className='ms-1 px-2 d-flex' onClick={handleToast}>
      <MdDeleteForever className='i-15 my-auto'/>
    </MDBBtn>
  )
}
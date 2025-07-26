import {Button, DetailRow, Col} from "@/component";
import toast from "react-hot-toast";
import type {DocInDetail} from "@/types/doc-types.ts";
import {MdMoreVert} from "react-icons/md";

type Props = {
  readonly doc: DocInDetail
}

export default function ModalInDetail({doc}: Props) {

  const onShow = () => {
    toast(t => (
      <ul className='list rounded-box w-72'>
        <DetailRow
          start='送文號'
          center={doc.number}
        />
        <DetailRow start='組別'
                   center={doc.groupName}
        />
        <DetailRow start='主旨'
                   center={doc.title}
        />
        <DetailRow
          start='承辦人'
          center={doc.username}
        />
        <DetailRow start='收文日期'
                   center={doc.receiveDate}
        />
        <DetailRow start='批閱日期'
                   center={doc.readDate}
        />
        <DetailRow start='狀態'
                   center={doc.status_display}
        />
        <DetailRow start='備註'
                   center={doc.remark}
        />
        <Col className='mt-4'>
          <Button size='sm' color='neutral' shape='block' onClick={() => toast.dismiss(t.id)}>
            關閉
          </Button>
        </Col>
      </ul>
    ))

  }


  return (
    <Button color='accent' shape='circle' style='ghost' size='sm' onClick={onShow}>
      <MdMoreVert className='text-lg'/>
    </Button>
  )
}
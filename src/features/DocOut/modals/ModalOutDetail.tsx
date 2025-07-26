import {Button, DetailRow, Row, Col} from "@/component";
import toast from "react-hot-toast";
import type {DocOutDetail} from "@/types/doc-types.ts";
import {MdMoreVert} from "react-icons/md";

type Props = {
  readonly doc: DocOutDetail
}

export default function ModalOutDetail({doc}: Props) {

  const onShow = () => {
    toast(t => (
      <ul className='list rounded-box w-72'>
        <DetailRow
          start='送文號'
          center={doc.number}
        />
        <DetailRow
          start='承辦人'
          center={doc.username}
        />
        <DetailRow start='組別'
                   center={doc.groupName}
        />
        <DetailRow start='主旨'
                   center={doc.title}
        />
        <DetailRow start='陳報日期'
                   center={doc.reportDate}
        />
        <DetailRow start='送文日期'
                   center={doc.sendDate}
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
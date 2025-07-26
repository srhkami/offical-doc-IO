import {UserDetail} from "../../utils/types.ts";
import {Card} from "react-bootstrap";
import {ReactNode} from "react";

type Props = {
  readonly obj: UserDetail,
  readonly header?: ReactNode,
}

export default function CardUser({obj, header = <></>}: Props) {

  // const content:ReactNode = obj.workContent.replace('\n',<br>)


  return (
    <Card>
      <Card.Header className='d-flex'>
        <span className='fs-4 fw-bold text-primary my-auto'>{obj.area}</span>
        <span className='ms-2 me-4 my-auto'>勤區</span>
        <span className='fs-5 fw-bold text-primary my-auto'> {obj.name}</span>
        {header}
      </Card.Header>
      <Card.Body className='f-09 fw-bolder p-3'>
        <div style={{ whiteSpace: 'pre-line' }}>
          {obj.workContent}
        </div>
      </Card.Body>
    </Card>
  )
}
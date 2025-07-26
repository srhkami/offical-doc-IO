import {Card, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {HiMiniRectangleGroup} from "react-icons/hi2";
import ModalAddGroup from "./ModalAddGroup.tsx";
import {GroupDetail} from "../../utils/types.ts";
import {useAxios} from "../../utils/useAxios.ts";
import toast from "react-hot-toast";
import {handleError} from "../../utils/handleError.ts";
import {ROOT_IP} from "../../utils/info.tsx";
import {MDBBtn} from "mdb-react-ui-kit";


export default function SettingGroup() {

  const api = useAxios();

  const [data, setData] = useState<Array<GroupDetail>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    toast.loading('載入中，請稍候...')
    api({
      method: 'GET',
      url: ROOT_IP + '/doc/groups/',
      params: {
        ordering: 'id',
      },
    })
      .then(res => {
        setData(res.data.results);
        toast.dismiss();
      })
      .catch(err => handleError(err))
  }, [isLoading]);

  const handleDeleteGroup = (id: number) => {
    toast.loading('處理中，請稍候...')
    setIsLoading(true);
    api({
      method: 'DELETE',
      url: ROOT_IP + `/doc/groups/${id}/`,
    }).then(() => {
      toast.dismiss();
      toast.success('刪除成功')
      setIsLoading(false);
    })
      .catch(err => {
        setIsLoading(false);
        handleError(err);
      })
  }

  const dataList = data.map(obj => {
    return (
      <tr key={obj.id}>
        <td className='text-center'>{obj.name}</td>
        <td className='text-center'>
          <MDBBtn color='danger' size='sm' outline onClick={() => handleDeleteGroup(obj.id)}>刪除</MDBBtn>
        </td>
      </tr>
    )
  })

  return (
      <Card className='p-0 shadow-lg rounded-3'>
        <Card.Header className='d-flex'>
          <HiMiniRectangleGroup className='me-2 my-auto i-18'/>
          <h3 className="fw-bolder m-0 my-auto">
            業務組設定
          </h3>
          <ModalAddGroup setIsLoading={setIsLoading}/>
        </Card.Header>
        <Card.Body>
          <Table hover>
            <thead>
            <tr>
              <th scope="col" className='text-center'>組別</th>
              <th scope="col" className='text-center'>操作</th>
            </tr>
            </thead>
            <tbody>
            {dataList}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
  )
}
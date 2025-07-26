import {useEffect, useState} from "react";
import {useAxios} from "@/hooks";
import type {GroupDetail} from "@/types/doc-types.ts";
import {ROOT_IP} from "@/utils/info.ts";

export default function OptionsGroup() {

  const api = useAxios()
  const [data, setData] = useState<Array<GroupDetail>>([]);

  useEffect(() => {
    api({
      method: 'GET',
      url: ROOT_IP + '/doc/groups/',
      params: {
        ordering: 'id',
      },
    })
      .then(res => {
        setData(res.data.results);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const dataList = data.map(obj => {
    return (
      <option key={obj.id} value={obj.name}>{obj.name}</option>
    )
  })

  return (
    <>
      <option value=''>請選擇</option>
      {dataList}
    </>
  )
}
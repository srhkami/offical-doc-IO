import {useEffect, useState} from "react";
import {ROOT_IP} from "../../utils/info.tsx";
import {useAxios} from "../../utils/useAxios.ts";
import {UserDetail} from "../../utils/types.ts";

export default function OptionsUser() {

  const api = useAxios()
  const [data, setData] = useState<Array<UserDetail>>([]);

  useEffect(() => {
    api({
      method: 'GET',
      url: ROOT_IP + '/doc/users/',
      params: {
        ordering: 'area',
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
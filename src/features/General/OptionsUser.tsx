import {useCacheApi} from "@/hooks";
import type {UserDetail} from "@/types/doc-types.ts";
import {ROOT_IP} from "@/utils/info";
import type {ApiResData} from "@/types/api-types.ts";

export default function OptionsUser() {

  const {data} = useCacheApi<ApiResData<Array<UserDetail>>>(ROOT_IP + '/doc/users/?ordering=area')

  const dataList = data?.results.map(obj => {
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
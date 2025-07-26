import {useCacheApi} from "@/hooks";
import type {GroupDetail} from "@/types/doc-types.ts";
import {ROOT_IP} from "@/utils/info.ts";
import type {ApiResData} from "@/types/api-types.ts";

export default function OptionsGroup() {

  const {data} = useCacheApi<ApiResData<Array<GroupDetail>>>(ROOT_IP + '/doc/groups/')

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
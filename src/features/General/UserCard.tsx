import {type ReactNode} from "react";
import type {UserDetail} from "@/types/doc-types.ts";

type Props = {
  readonly user: UserDetail,
  readonly header?: ReactNode,
}

export default function UserCard({user, header = <></>}: Props) {

  return (
    <div className='card bg-base-100 border border-base-300'>
      <div className='card-title flex mt-2 mx-4'>
        <span className='text-2xl font-bold text-primary'>{user.area}</span>
        <span className='text-sm'>勤區</span>
        <span className='text-xl text-primary'> {user.name}</span>
        <div className='ml-auto mr-2'>
          {header}
        </div>
      </div>
      <div className='card-body text-sm whitespace-pre-line'>
        {user.workContent}
      </div>
    </div>
  )
}
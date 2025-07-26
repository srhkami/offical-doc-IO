import {type ReactNode} from "react";
import type {UserDetail} from "@/types/doc-types.ts";

type Props = {
  readonly user: UserDetail,
  readonly header?: ReactNode,
}

export default function UserCard({user, header = <></>}: Props) {

  return (
    <div className='card bg-base-100 border border-base-300'>
      <div className='card-title'>
        <span className='fs-4 fw-bold text-primary my-auto'>{user.area}</span>
        <span className='ms-2 me-4 my-auto'>勤區</span>
        <span className='fs-5 fw-bold text-primary my-auto'> {user.name}</span>
        {header}
      </div>
      <div className='card-body'>
        <div style={{ whiteSpace: 'pre-line' }}>
          {user.workContent}
        </div>
      </div>
    </div>
  )
}
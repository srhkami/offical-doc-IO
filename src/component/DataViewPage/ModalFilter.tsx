import {BottomButton, Modal, ModalBody, ModalHeader, ModalTitle} from "@/component";
import {TbFilterCog} from "react-icons/tb";
import {type DataOrderList} from "@/types/api-types.ts";
import {useModal} from "@/hooks";
import {useNavigate} from "react-router";

type Props = {
  readonly path: string,
  readonly orderList: DataOrderList,
}

/**
 * 檢視資料中，用來顯示篩選內容的對話框
 * @param path 基礎網址
 * @param orderList 排序清單
 * @constructor
 */
export default function ModalFilter({path, orderList}: Props) {

  const navi = useNavigate();
  const {isShow, onShow, onHide} = useModal();

  // 經由排序清單繪製下拉選單組件
  const orderItems = orderList.map(item => {
    const newParams = new URLSearchParams(item.param); // 將現有params與項目本身傳入的param結合
    const onClick = () => {
      navi(`${path}/1?${newParams.toString()}`);
      onHide();
    }
    return (
      <li key={item.text}>
        <button onClick={onClick}>
          {item.text}
        </button>
      </li>
    )
  })

  return (
    <>
      <BottomButton onClick={onShow} label='篩選' >
        <TbFilterCog className='text-xl'/>
      </BottomButton>
      <Modal isShow={isShow} onHide={onHide} closeButton size='xs'>
        <ModalHeader>
          <ModalTitle>
            排序與篩選
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <ul className='menu w-full'>
            {orderItems}
            <li>
              <button onClick={
                () => {
                  navi(`${path}/1`);
                  onHide();
                }
              }>
                <span className='text-error'>清除條件</span>
              </button>
            </li>
          </ul>
        </ModalBody>
      </Modal>
    </>
  )
}
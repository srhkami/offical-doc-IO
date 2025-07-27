import {type SubmitHandler, useForm} from "react-hook-form";
import {IoMdPrint} from "react-icons/io";
import {useNavigate} from "react-router";
import {useModal} from "@/hooks";
import {BottomMainButton, Button, Col, FormInputCol, Modal, ModalBody, ModalHeader, ModalTitle, Row} from "@/component";
import {getDate} from "@/utils/getDate.ts";

type Props = {
  readonly mode: 'out' | 'in',
}

/**
 * 選擇日期，前往列印功能的對話框
 * @param mode
 * @constructor
 */
export default function ModalSelectDate({mode}: Props) {

  const navi = useNavigate();
  const {isShow, onShow, onHide} = useModal();

  const {
    register,
    handleSubmit,
  }
    = useForm<{ sendDate: string }>({defaultValues: {sendDate: getDate().today}});

  const onSubmit: SubmitHandler<{ sendDate: string }> = (formDate) => {
    if (mode === 'out') {
      navi('/out/print/' + formDate.sendDate);
    } else {
      navi('/in/print/' + formDate.sendDate);
    }
    onHide();
  }

  return (
    <>
      <BottomMainButton color='info' onClick={onShow}>
        <IoMdPrint className='text-lg'/>
        {/*{mode === 'out'? '列印歷史送文簿' : '列印歷史收文簿'}*/}
      </BottomMainButton>
      <Modal isShow={isShow} onHide={onHide} size='sm' closeButton>
        <ModalHeader>
          <ModalTitle>
            列印
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Row>
            <FormInputCol xs={9} label='請選擇收送文日期' error={undefined}>
              <input
                className='input w-full'
                type='date'
                {...register('sendDate', {required: true})}
              />
            </FormInputCol>
            <Col xs={3} className='flex items-end justify-end'>
              <Button color='primary' onClick={handleSubmit(onSubmit)}>
                查詢
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  )
}
import React from 'react';
import './style.scss';
import Button from '../button';
import ButtonsGroup from '../buttons-group';

interface Props {
  text: string;
  open: boolean;
  onClose: (e: any) => void;
  onAction: (e: any) => void;
}

export const Confirm = ({ text, open, onClose, onAction }: Props) => {
  return (
    <div className={`alertContainer ${!open ? 'hide' : ''}`}>
      <div className='alertBox'>
        <p className='alertText'>{text}</p>
        <ButtonsGroup>
          <Button onClick={onClose}>닫기</Button>
          <Button
            onClick={onAction}
            style={{
              background: '#000',
              color: '#fff',
            }}
          >
            확인
          </Button>
        </ButtonsGroup>
      </div>
    </div>
  );
};

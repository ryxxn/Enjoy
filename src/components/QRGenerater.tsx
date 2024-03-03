import React from 'react';

import QRCode from 'qrcode.react';
import ButtonsGroup from './buttons-group';
import Button from './button';
import { px } from 'src/utils/styles';

interface Props {
  stampId: string | undefined;
  onClose: VoidFunction;
}

export const QrGenerater = ({ stampId, onClose }: Props) => {
  // 스탬프 정보를 JSON 형식의 문자열로 변환
  // const stampInfoJSON = JSON.stringify(stampInfo);

  const downloadQRCode = () => {
    const canvas = document.querySelector(
      '#qrcode-canvas'
    ) as HTMLCanvasElement;
    if (!canvas) throw new Error('<canvas> not found in the DOM');

    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'QR code.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <h2>스탬프 정보</h2>
      <p>큐알 코드를 스캔하여 스탬프 정보를 가져올 수 있습니다.</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBlock: px(32),
        }}
      >
        {stampId ? (
          <QRCode value={stampId} id='qrcode-canvas' />
        ) : (
          <div>스탬프 정보를 찾을 수 없습니다.</div>
        )}
      </div>
      <ButtonsGroup>
        <Button onClick={onClose}>닫기</Button>
        <Button fill onClick={downloadQRCode}>
          다운로드
        </Button>
      </ButtonsGroup>
    </div>
  );
};

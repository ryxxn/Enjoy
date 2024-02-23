import React, { useRef, useState } from 'react'

import QRCode from 'qrcode.react';

export const QrGenerater = () => {
  const [stampInfo, setStampInfo] = useState("521fbb1f-a4c1-45fa-a2ef-742ac4decfee");

  // 스탬프 정보를 JSON 형식의 문자열로 변환
  // const stampInfoJSON = JSON.stringify(stampInfo);

  const qrRef = useRef(null);


    const downloadQRCode = () => {
      const canvas = document.querySelector("#qrcode-canvas") as HTMLCanvasElement
      if (!canvas) throw new Error("<canvas> not found in the DOM")

      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream")
      const downloadLink = document.createElement("a")
      downloadLink.href = pngUrl
      downloadLink.download = "QR code.png"
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }

  return (
    <div className="App">
      <h2>스탬프 정보</h2>
      <p>스탬프 data : {stampInfo}</p>

      // 큐알코드 생성
      <QRCode
        value={stampInfo}
        id="qrcode-canvas"
      />
      <button onClick={downloadQRCode}>다운로드</button>
      <p>큐알 코드를 스캔하여 스탬프 정보를 가져올 수 있습니다.</p>
    </div>
  );
}

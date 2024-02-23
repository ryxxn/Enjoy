import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Webcam from 'react-webcam';
import { QrReader } from 'react-qr-reader';

const QrContainer = styled.div`
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  min-width: 100vw;
  min-height: 100vh;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .8);

  .qrReader{
    position: relative;
    width: 340px !important;
    height: 340px !important;
    overflow: hidden;
    
    div{
      border: 8px solid var(--white);
      box-sizing: border-box;
      padding: 0 !important;
      border-radius: 32px;
      width: 340px !important;
      height: 340px !important;
      
      video{
        position: absolute;
        width: 100vh !important;
        height: 100vh !important;
        transform: translateX(calc(-50% + 150px)) translateY(calc(-50% + 150px));
        background-size: cover;
      }
    }
  }
  .closeButton{
    width: 140px;
    margin-top: 32px;
    line-height: 40px;
    border-radius: 4px;
    border: none;
    background-color: var(--white);
    font-size: 18px;
  }
`

interface QrReaderPropsType {
  setIsActiveQr: Function
  setStampId: Function
}
export const EQrReader: React.FC<QrReaderPropsType> = ({ setIsActiveQr, setStampId }) => {

  const [data, setData] = useState<any>(null);



  return (
    <QrContainer>
      <QrReader
        onResult={(result: any, error) => {
          if (!!result) {
            setData(result?.text);
            setStampId(result?.text)
            setIsActiveQr();
            // console.log(result?.text)
          }

          if (!!error) {
            // console.info(error);
          }
        }}
        containerStyle={{ width: '100%', height: "100%" }}
        constraints={{ facingMode: 'environment' }}
        className='qrReader'
      />
      <button className="closeButton" onClick={() => setIsActiveQr()}>닫기</button>
    </QrContainer>
  );
}


/*
위의 코드에서는 큐알 코드 생성 시 QRCode 컴포넌트를 사용하고, stampInfo 객체를 JSON 문자열로 변환하여 큐알 코드의 value 속성에 전달합니다. 사용자가 큐알 코드를 스캔하면 JSON 데이터를 추출하여 스탬프 정보를 화면에 표시할 수 있습니다.

실제로 사용하려면 큐알 코드 스캔 라이브러리를 사용하여 큐알 코드를 스캔하고, 스캔된 데이터를 디코딩하여 스탬프 정보를 추출해야 합니다.
*/



//================================================================================================================================================

/**
 * 
 * 리액트 앱에서 카메라를 사용하여 큐알 코드를 스캔하고, 스캔한 코드에 해당하는 스탬프 정보를 내 데이터에 저장하려면 다음 단계를 따를 수 있습니다:

카메라 액세스 설정:
먼저 사용자의 카메라 액세스 권한을 요청하고, 사용자가 권한을 부여하면 카메라를 사용할 수 있도록 설정해야 합니다. 이를 위해 React에서 react-webcam 또는 react-camera와 같은 라이브러리를 사용할 수 있습니다. 이 라이브러리를 사용하여 카메라에서 비디오 스트림을 가져올 수 있습니다.

큐알 코드 스캔 라이브러리 추가:
큐알 코드 스캔을 위해 react-qr-reader 또는 jsqr과 같은 큐알 코드 스캔 라이브러리를 추가합니다. 이러한 라이브러리는 카메라에서 스캔한 데이터를 분석하고 큐알 코드 정보를 추출하는 데 도움이 됩니다.

큐알 코드 스캔 및 데이터 처리:
큐알 코드 스캔 라이브러리를 사용하여 카메라에서 스캔한 데이터를 처리합니다. 스캔한 큐알 코드의 정보를 추출하고 해당 정보를 사용하여 내 데이터에 스탬프 정보를 저장합니다.

스탬프 정보 저장:
큐알 코드에서 추출한 정보를 사용하여 내 데이터에 스탬프 정보를 저장합니다. 이 정보를 적절한 데이터 구조 또는 상태로 저장하고 필요한 경우 서버에 업로드하거나 로컬 저장소에 저장할 수 있습니다.

아래는 간단한 예제 코드로, react-webcam 및 react-qr-reader를 사용하여 React 앱에서 카메라를 열고 큐알 코드를 스캔하고 정보를 저장하는 방법을 보여줍니다.
*/


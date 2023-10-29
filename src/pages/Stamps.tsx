import React, { useEffect, useState } from 'react'
import { Container, Content } from '../components/Container'
import { Heading } from '../components/Heading'
import { MenuBar } from '../components/MenuBar'
import { styled } from 'styled-components'
import { AddButton } from '../components/AddButton'
import { QrGenerater } from '../components/QRGenerater'
import { EQrReader } from '../components/QRReader'
import { addStampIdToUser, getStamps } from '../services/stamps.services'
import { auth } from '../firebase'
import { isUuidPattern } from '../utils/functions'

const StampsBox = styled.div`
    position: relative;
    width: 100%;
    height: calc(100vh - 166px - 30px - 40px);
    background-color: #FFEBEB;
    border: 1px solid #FFD7D7;
    border-radius: 8px;
    margin-top: 40px;
    padding: 18px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
`

const Stamp = styled.img`
    position: absolute;
    animation: rotate .3s linear;
    &:first-child{
        left: 40px;
        top: 40px;
    }
    &:nth-child(2){
        left: 180px;
        top: 90px;
    }
    @keyframes rotate{
        to{
            tramsform: rotate(360deg);
        }
    }

`
export interface stampDataType {
    name: string,
    kind: string,
    imgSrc?: string,
    date?: Date
    createdAt?: Date
}

export const Stamps = () => {

    const [isActiveQr, setIsActiveQr] = useState<boolean>(false);
    // QR을 찍으면 스탬프 id가 들어온다.
    const [stampId, setStampId] = useState(null);

    const [stamps, setStamps] = useState<stampDataType[]>([]);

    useEffect(() => {
        if (!stampId) return;
        if (!auth.currentUser?.uid) return;

        if(!isUuidPattern(stampId)){
            alert("유효한 QR코드가 아닙니다.");
            setStampId(null);
            return;
        }
        
        // 데이터가 들어오면 
        addStampIdToUser(auth.currentUser?.uid, stampId);
        setStampId(null);
    }, [stampId])

    const fetchStamps = async () => {
        const response = await getStamps();
        setStamps(response);
    }

    useEffect(() => {
        if (!auth.currentUser?.uid) return;
        fetchStamps();
    }, [auth.currentUser])

    return (
        <Container>
            {isActiveQr ?
                <EQrReader
                    setIsActiveQr={() => setIsActiveQr(false)}
                    setStampId={(e: any) => setStampId(e)}
                />
                : null}
            <Content style={{justifyContent: "flex-start"}}>
                <Heading
                    heading="my stamps"
                    subText="get your stamps"
                />
                <StampsBox>
                    {
                        stamps.map((stamp, index) => (
                            <Stamp src={stamp.imgSrc} key={index} />
                        ))
                    }
                    <AddButton
                        style={{
                            width: "72px",
                            backgroundColor: "var(--white)",
                            justifySelf: "flex-end",
                            alignSelf: "flex-end"
                        }}
                        iconStyle={{ backgroundColor: "" }}
                        type="button"
                        onChange={() => setIsActiveQr(true)}
                    />
                </StampsBox>
            </Content>
            <MenuBar actived="stamps" />
        </Container>
    )
}

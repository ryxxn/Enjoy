import React from 'react'
import { Container, Content } from '../components/Container'
import { Heading } from '../components/Heading'
import { MenuBar } from '../components/MenuBar'
import { SearchBar } from '../components/SearchBar'
import styled from 'styled-components'

const NoticeContainer = styled.ul`
    width: 100%;
    height: calc(100vh - 100px - 40px - 18px*3);
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0;
    margin-top: 18px;
    overflow-y: auto;
    list-style: none;
`

const NoticeCell = styled.li`
    width: 100%;
    height: 80px;
    padding: 12px 16px;
    box-sizing: border-box;
    border-radius: 4px;
    border: var(--border);
    display: flex;
    flex-direction: column;
    gap: 8px;

    .kind{
        font-size: 11px;
        color: #838383;
    }
    .title{
        font-size: 12px;
    }
`

interface NoticeDataType {
    kind: string,
    title: string,
}
export const Notice = () => {

    const noticeData: NoticeDataType[] = [
        { kind: "[학사 공지사항]", title: "2023학년도 호텔관광대학 이렇게 달라졌습니다!\n(환경개선사업 결과 공유)" },
        { kind: "[국제화 공지사항]", title: "호텔관광대학 2023학년도 하계 해외 전공연수\n(츠지조조리전문학교)" },
        { kind: "[장학 공지사항]", title: '2023학년도 2학기 호텔관광대학 "H & T 미래인재 장학" 신청 안내' },
        { kind: "[학과 공지사항]", title: "[DB그룹] 2023 하반기 DB그룹 신입사원 공개채용 모집 (~10/6) " },
        { kind: "[기타(취업 등) 공지사항]", title: "[김진영 교수 연구실] 조교 모집" },
        { kind: "[학생회 공지사항]", title: "9/25 2023학년도 2학기 개강총회 및 개강파티 참여 안내" },
    ]

    return (
        <Container>
            <Content>
                <Heading
                    heading="notice"
                    subText="daily check"
                />
                <SearchBar></SearchBar>
                <NoticeContainer>
                    {noticeData.map((item: NoticeDataType, index:number) => (
                        <NoticeCell key={index}>
                            <p className="kind">{item.kind}</p>
                            <p className="title">{item.title}</p>
                        </NoticeCell>
                    ))}
                </NoticeContainer>
            </Content>
            <MenuBar actived="notice" />
        </Container>
    )
}

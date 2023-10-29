import React, { useEffect } from 'react'
import { Container, Content } from '../components/Container'
import { Heading } from '../components/Heading'
import { MenuBar } from '../components/MenuBar'
import styled from 'styled-components'
import { getNews } from '../services/news.service'
import { useNavigate } from 'react-router-dom'

const YoutubeContainer = styled.div`
    width: 100%;
    p{
        font-size: 28px;
        color: var(--white);
        text-transform: uppercase;
        margin-bottom: 12px;
    }
`

const NewsContainer = styled.div`
    
`

const Card = styled.div`
    border-radius: 10px;
    padding: 8px;
    background-color: var(--glass-bg);
    overflow: hidden;
    box-sizing: border-box;
    iframe{
        width: 100%;
        aspect-ratio: 343/ 193;
        border-radius: 8.5px;
    }
`

interface VideosDataType {
    title: string,
    src: string,
}
export const Media = () => {

    const videosData: VideosDataType[] = [
        {title: "YouTube video player", src:"https://www.youtube.com/embed/q8pnmDxjsGg?si=5wafV-DJJON176Sc"}
    ]

    const navigate = useNavigate();

    useEffect(()=>{
        // getNews();
        window.alert("준비 중인 기능입니다.");
        navigate(-1);
    }, [])

    return (
        <Container>
            <Content>
                <Heading
                    heading="media"
                    subText="recently uploaded"
                />
                <YoutubeContainer>
                    <p>youtube</p>
                    {videosData.map((item: VideosDataType, index:number) => (
                        <Card key={index}>
                            <iframe
                                src={item.src}
                                title={item.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </Card>
                    ))}
                </YoutubeContainer>
                <NewsContainer>

                </NewsContainer>
            </Content>
            <MenuBar actived="media" />
        </Container>
    )
}

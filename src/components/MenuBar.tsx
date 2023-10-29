import React, { ReactNode } from 'react'
import { Link as ReactRouterDomLink } from "react-router-dom";
import { styled } from 'styled-components'
import { EnMedia, EnNotice, EnProfile, EnStamps } from './Icons/En';

const MenuBarContainer = styled.div`
    width: 100%;
    height: 100px;
    position: fixed;
    bottom: 0;
    border-radius: 12px 12px 0 0;
    background-color: var(--white);
    z-index: 10;
    display: flex;
    justify-content: space-between;
    padding: 0 32px;
    box-sizing: border-box;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,.25);
    
`

interface LinkPropsType {
    isActived: boolean,
    children: ReactNode,
    to: string
}
const Link: React.FC<LinkPropsType> = ({ isActived, children, to, ...props }) => {
    return <ReactRouterDomLink to={to} {...props}>{children}</ReactRouterDomLink>;
};

const IconButton = styled(Link)`
    text-decoration: none;
    font-size: 10px;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    
    color: ${props => props.isActived ? `var(--main-color)` : `var(--main-disabled)`};
`

interface MenubarPropsType {
    actived: "profile" | "stamps" | "notice" | "media"
}

export const MenuBar: React.FC<MenubarPropsType> = ({ actived }) => {
    return (
        <MenuBarContainer>
            <IconButton
                to="/profile"
                isActived={actived === "profile"}
            >
                <EnProfile actived={actived === "profile"} />
                Profile
            </IconButton>
            <IconButton
                to="/stamps"
                isActived={actived === "stamps"}
            >
                <EnStamps actived={actived === "stamps"} />
                Stamps
            </IconButton>
            <IconButton
                to="/notice"
                isActived={actived === "notice"}
            >
                <EnNotice actived={actived === "notice"} />
                Notice
            </IconButton>
            <IconButton
                to="/media"
                isActived={actived === "media"}
            >
                <EnMedia actived={actived === "media"} />
                Media
            </IconButton>
        </MenuBarContainer>
    )
}

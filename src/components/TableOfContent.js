import React, { useState } from 'react';
import styled from 'styled-components';
import Scrollspy from 'react-scrollspy';

const Container = styled.div`
    @media only screen and (min-width: 1400px) {
        & {
            transform: translateX(100%);
            float: right;
            margin-left: -100%;
            margin-right: -50px;
            padding-left: 20px;
            position: sticky;
            top: 20px;
            right: -20px;
            width: 250px;
            color: var(--bockquote-color); 
            border-left: 4px solid var(--bockquote-color);
            padding: 15px;
        }

        & ul {
            margin-bottom: 0;
        }

        & li {
            list-style: none;
            margin-bottom: 0px;
        }

        & h4 {
            margin-top: 10px;
        }

        & a {
            color: var(--bockquote-color);
            box-shadow: none;
        }

        & a:hover {
            color: var(--primary-color);
        }

        & li.active a, & li.passed a {
            color: var(--primary-color);
        }
    }

    @media only screen and (max-width: 1400px) {
        & {
            display: none;
        }
    }
`;

export default function TableOfContent(props) {
    const [active, setActive] = useState();

    if (props.items) {
        return (
            <Container>
                <h4>Table of Contents</h4>
                <Scrollspy
                    items={props.items.map(item => item.url.substr(1))}
                    onUpdate={(el) => {
                        if (el) {
                            setActive(`#${el.attributes.getNamedItem('id').value}`);
                        }
                    }}
                >
                    {props.items.map(item => {
                        return (
                            <li class={item.url === active && 'active'}>
                                <a href={item.url}>{item.title}</a>
                            </li>
                        );
                    })}
                </Scrollspy>
            </Container>
        )
    }

    return null;
}
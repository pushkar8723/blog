import React from 'react';
import styled from 'styled-components';

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

        & h4 {
            margin-top: 10px;
        }

        & a {
            color: var(--bockquote-color);
            box-shadow: none;
        }
    }

    @media only screen and (max-width: 1400px) {
        & {
            display: none;
        }
    }
`;

export default function TableOfContent(props) {
    if (props.items) {
        return (
            <Container>
                <h4>Table of Contents</h4>
                {props.items.map(item => {
                    return <><a href={item.url}>{item.title}</a><br/></>;
                })}
            </Container>
        )
    }

    return null;
}
import React, { useState } from 'react';
import styled from 'styled-components';
import Scrollspy from 'react-scrollspy';
import PropTypes from 'prop-types';

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
            color: var(--color-text);
            border-left: 4px solid var(--color-text-light);
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
            color: var(--color-text);
            box-shadow: none;
            text-decoration: none;
        }

        & a:hover {
            color: var(--color-primary);
        }

        & li.active a,
        & li.passed a {
            color: var(--color-primary);
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
                    onUpdate={el => {
                        if (el) {
                            setActive(
                                `#${el.attributes.getNamedItem('id').value}`
                            );
                        }
                    }}
                >
                    {props.items.map(item => (
                        <li className={item.url === active && 'active'}>
                            <a href={item.url}>{item.title}</a>
                        </li>
                    ))}
                </Scrollspy>
            </Container>
        );
    }

    return null;
}

TableOfContent.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })
    ).isRequired,
};

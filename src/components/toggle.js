import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { resetTheme } from '../utils/typography';

const Switch = styled.label`
    position: relative;
    display: inline-block;
    width: 45px;
    height: 20px;

    & > input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    & .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #2196F3;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 3px;
    }

    & .slider:before {
        position: absolute;
        content: "";
        height: 24px;
        width: 24px;
        left: -2px;
        bottom: -2px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
        border-radius: 50%;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    & input:checked + .slider {
        box-shadow: 0 0 2px #2196F3;
    }

    & input:focus + .slider:before {
        box-shadow: 0 0 3px 3px #2196F3;
    }

    & input:checked + .slider:before {
        transform: translateX(25px);
    }
`;

const Toggle = () => {
    const [dark, setDark] = useState();
    
    useEffect(() => {
        const theme = localStorage.getItem('theme');
        setDark(
            theme
                ? theme === 'dark'
                : window.matchMedia('(prefers-color-scheme: dark)').matches
        );
    }, []);

    const updateTheme = (event) => {
        const { checked } = event.target;
        localStorage.setItem('theme', checked ? 'dark' : 'light');
        setDark(checked);
        const root = window.document.documentElement;
        if (checked) {
            root.style.setProperty('--background-color', "#31313c");
            root.style.setProperty('--primary-color', "#FFF4EC");
            root.style.setProperty('--link-color', "#64baff");
        } else {
            root.style.setProperty('--background-color', "#FFF4EC");
            root.style.setProperty('--primary-color', "hsla(0,0%,0%,0.9)");
            root.style.setProperty('--link-color', "#007acc");
        }
    }
    
    if (typeof dark !== 'undefined') {
        return (
            <Switch>
                <input type="checkbox" checked={dark} onChange={updateTheme}/>
                <span class="slider">
                    <FontAwesomeIcon icon={faMoon} style={{ color: 'white' }} />
                    <FontAwesomeIcon icon={faSun} style={{ color: 'white' }} />
                </span>
            </Switch>
        );
    }

    return null;
};

export default Toggle;

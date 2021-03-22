import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        transition: all .5s linear
    }
`;

export const lightTheme = {
    body: 'light gray',
    text: '#121212'
};

export const darkTheme = {
    body: '#121212',
    text: 'light gray'
};
// #region Global Imports
import styled from "styled-components";
// #endregion Global Imports

export const Container = styled.div`
    background-color: ${({ theme }) => theme.colors.primary};
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
    justify-content: flex-start;
    align-items: center;
    min-height: 100vh;
    background-color: rgb(224, 155, 64);
`;

export const BeerButton = styled.div`
    height: 80px;
    width: 80px;
    &:hover {
        transform: rotate(45deg);
        transition: all 0.5s ease-in-out 0s;
        cursor: pointer;
    }
`;

export const HeaderWrapper = styled.div`
    margin-bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
`;

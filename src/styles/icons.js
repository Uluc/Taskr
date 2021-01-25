import styled from "styled-components"
import {IoMdArrowBack, IoMdAddCircle} from "react-icons/io"

export const BackIcon = styled(IoMdArrowBack)`
    font-size: 1.7rem;
    cursor: pointer;
    justify-self: start;
    margin-right: auto;
    transition: 0.2s all ease-in;

    &:hover{
        font-size: 2rem;
        color: purple;
    }

`;

export const AddIcon = styled(IoMdAddCircle)`
    
    font-size: 5rem;
    cursor: pointer;
    transition: 0.2s all ease-in;
    margin-top: 2rem;
    transform-origin: center;

    &:hover{
        color: purple;
    }
`;
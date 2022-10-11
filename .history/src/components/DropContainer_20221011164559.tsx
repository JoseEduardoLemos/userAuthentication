import styled, { css } from 'styled-components';


const dragActive = css `
    border-color : #78e5d5;
`;
const dragReject = css`
    border-color: #e57878;
`;


export const DropContainer = styled.div.attrs({
    className : "dropzone"
})`
    border: 1px dashed #ddd;
    border-radius : 4px;
    cursor : PointerEvent;

    transition : height 2.2s ease;

    ${props => props.isDragActive && dragActive};
    ${props => props.isDragReject && dragReject};
`;
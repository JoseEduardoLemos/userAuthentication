import styled from 'styled-components';

export const DropContainer = styled.div.attrs({
    className : "dropzone"
})`
    border: 1px dashed #ddd;
    border-radius : 4px;
    cursor : PointerEvent;

    transition : height 2.2s ease;
`;
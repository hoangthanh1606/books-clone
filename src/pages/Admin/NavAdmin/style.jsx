import styled, { css } from 'styled-components';

export const SidebarContainer = styled.div`
  position: fixed;
  /* top: 120px; */
  width: 250px;
  height: calc(100vh - 0px);
  background-color: #ffccc7;
`;

export const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: ${(props) => props.height || '50px'};
  cursor: pointer;
  &:hover {
    background-color: #ff7875;
  }
  ${(props) => props.active && css`
    background-color: #ff7875;
    border-right: 5px solid #f5222d;
  `}
`;
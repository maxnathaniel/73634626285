import styled from 'styled-components';

interface SidebarProps {
  width: number;
}

export const SidebarWrapper = styled.div<SidebarProps>`
  min-width: ${({ width }) => `${width}px`};
  height: 100vh;

  > ul {
    list-style-type: none;
    padding-left: 0;
    margin-top: 0;
  }
`;

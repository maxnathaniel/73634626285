import styled from 'styled-components';

interface SidebarProps {
  width: number;
}

export const SidebarWrapper = styled.div<SidebarProps>`
  min-width: ${({ width }) => `${width}px`};
  height: calc(100vh - 60px);

  > ul {
    list-style-type: none;
    padding-left: 0;
    margin-top: 0;
  }
`;

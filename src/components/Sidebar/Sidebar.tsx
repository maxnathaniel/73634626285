import { ReactNode } from 'react';

import { SidebarWrapper } from './styles';

interface Props {
  children: ReactNode;
  id: string;
  width: number;
}

const Sidebar = (props: Props) => {
  const { children, id, width } = props;

  return (
    <SidebarWrapper id={id} width={width}>
      {children}
    </SidebarWrapper>
  );
};

export default Sidebar;

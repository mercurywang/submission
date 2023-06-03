import { FC } from 'react';

export interface HeaderProps {
  name: string;
}

const Header: FC<HeaderProps> = ({ name }) => <h2>{name}</h2>;

export default Header;

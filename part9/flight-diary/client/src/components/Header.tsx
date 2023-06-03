import { FC } from 'react';

export interface HeaderProps {
  name: string;
}

const Header: FC<HeaderProps> = ({ name }) => <h1>{name}</h1>;

export default Header;

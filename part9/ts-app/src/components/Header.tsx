import { FC } from 'react';

export interface HeaderProps {
  courseName: string;
}

const Header: FC<HeaderProps> = ({ courseName }) => <h1>{courseName}</h1>;

export default Header;

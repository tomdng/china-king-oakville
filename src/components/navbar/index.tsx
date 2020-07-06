import React from 'react';

import LargeNavbar from './largeNavbar';
import MobileNavbar from './mobileNavbar';

interface HeaderProps {
  siteTitle: string;
}

const Header: React.FC<HeaderProps> = ({ siteTitle }): JSX.Element => (
  <>
    <LargeNavbar siteTitle={siteTitle} />
    <MobileNavbar siteTitle="China King" />
  </>
);

export default Header;

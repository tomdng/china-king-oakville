import React from 'react';
import styled, { AnyStyledComponent } from 'styled-components';

import {
  accent,
  secondaryColor,
  textPrimaryLight,
  textSecondaryLight,
} from '../../settings';

const StyledFooter: AnyStyledComponent = styled.footer`
  display: flex;
  flex-direction: column;
  background: ${secondaryColor};
`;

const Copyright: AnyStyledComponent = styled.p`
  font-size: 16px;
  color: ${textSecondaryLight};
`;

const Footer: React.FC = (): JSX.Element => (
  <StyledFooter>
    <Copyright>
      {'© '}
      {new Date().getFullYear()}
      {' China King Oakville'}
    </Copyright>
  </StyledFooter>
);

export default Footer;

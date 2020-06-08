import React from 'react';
import styled, { AnyStyledComponent } from 'styled-components';

import Layout from '../components/layout';
import Menu from '../components/menu';
import SEO from '../components/seo';
import { textPrimaryDark } from '../settings';

const StyledMenuHeader: AnyStyledComponent = styled.div`
  width: 90vw;
  max-width: 1500px;
  margin: 2rem 0 1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;

  p {
    font-size: 24px;
    margin-left: 2rem;
  }

  a {
    color: ${textPrimaryDark};
  }
`;

// TODO: Add link for PDF version of menu
const MenuPage: React.FC = (): JSX.Element => (
  <Layout>
    <SEO title="Menu" />
    <StyledMenuHeader>
      <h1>Menu</h1>
      <p>
        <a href="#" target="_blank">
          Need a PDF version?
        </a>
      </p>
    </StyledMenuHeader>
    <Menu />
  </Layout>
);

export default MenuPage;

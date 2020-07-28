import React from 'react';
import styled, { AnyStyledComponent } from 'styled-components';

import Layout from '../components/layout';
import Menu from '../components/menu';
import SEO from '../components/seo';
import { secondaryColor, textPrimaryDark, mobileWidth } from '../settings';

const StyledMenuHeader: AnyStyledComponent = styled.div`
  width: 90vw;
  max-width: 1500px;
  margin: 2rem 0 -2rem 0;
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

  a:hover {
    color: ${secondaryColor};
  }

  @media (max-width: ${mobileWidth}) {
    p {
      font-size: 16px;
    }
  }
`;

const StyledMenuSubtext: AnyStyledComponent = styled.ul`
  width: 90vw;
  max-width: 1500px;
  margin: 0 0 1rem 0;

  li {
    font-family: Mukta;
    font-size: 24px;
    font-weight: 300;
    margin: 0.5rem 0;
  }

  @media (max-width: ${mobileWidth}) {
    margin-top: 1rem;

    li {
      font-size: 20px;
      margin: 0.25rem;
    }
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
    <StyledMenuSubtext>
      <li>
        If there are multiple prices, then the item comes in both a large and
        small size.
      </li>
      <li>Red items are spicy.</li>
      <li>Lunch specials are only available before 3:00 pm.</li>
    </StyledMenuSubtext>
    <Menu />
  </Layout>
);

export default MenuPage;

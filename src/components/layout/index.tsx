import React from 'react';
import styled, { AnyStyledComponent } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import Footer from '../footer';
import Navbar from '../navbar';
import './normalize.css';

// TODO: Figure out a really fast way to render fonts
const StyledLayout: AnyStyledComponent = styled.div`
  min-height: 100vh;
  background: #fffff5;
  font-family: 'Mukta'; /* Default font */
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <StyledLayout>
      <Navbar siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
      <Footer />
    </StyledLayout>
  );
};

export default Layout;

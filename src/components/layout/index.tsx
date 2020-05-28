import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { AnyStyledComponent } from 'styled-components';

import Header from '../navbar';
import './normalize.css';

// TODO: Figure out a really fast way to render fonts
const StyledLayout: AnyStyledComponent = styled.div`
  min-height: 100vh;
  background: #fffff5;
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
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>
          {'© '}
          {new Date().getFullYear()}
          Built with Gatsby
        </footer>
      </div>
    </StyledLayout>
  );
};

export default Layout;

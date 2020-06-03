import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled, { AnyStyledComponent } from 'styled-components';

import {
  accent,
  secondaryColor,
  textPrimaryLight,
  textSecondaryLight,
} from '../../settings';

const StyledFooter: AnyStyledComponent = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${secondaryColor};
`;

const StyledBlockWrapper: AnyStyledComponent = styled.div`
  width: 90vw;
  max-width: 1500px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5rem 0;
`;

const StyledBlock: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    color: ${accent};
    font-family: 'Noto Serif';
    font-size: 36px;
    font-weight: 900;
    margin-bottom: 0.5rem;

    a {
      color: ${accent};
      text-decoration: none;
    }
  }

  p {
    color: ${textPrimaryLight};
    font-family: 'Mukta';
    font-size: 24px;
    font-weight: 700;
    margin: 0.25rem 0;

    a {
      color: ${textPrimaryLight};
      text-decoration: none;
    }
  }
`;

const StyledCopyright: AnyStyledComponent = styled.small`
  width: 90vw;
  max-width: 1500px;
  font-size: 16px;
  color: ${textSecondaryLight};
  margin-bottom: 1rem;
`;

const Footer: React.FC = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query FooterInfoQuery {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/info/" } }) {
        nodes {
          frontmatter {
            address
            hours
            phone
          }
        }
      }
    }
  `);

  const { address, hours, phone } = data.allMarkdownRemark.nodes[0].frontmatter;

  const addressText = address.map((adressLine: string) => {
    return <p key={adressLine}>{adressLine}</p>;
  });

  const hoursText = hours.map((hourLine: string) => {
    return <p key={hourLine}>{hourLine}</p>;
  });

  const phoneText = phone.map((phoneLine: string) => {
    return <p key={phoneLine}>{phoneLine}</p>;
  });
  return (
    <StyledFooter>
      <StyledBlockWrapper>
        <StyledBlock>
          <h1>
            <Link to="/">China King</Link>
          </h1>
          <p>
            <Link to="/menu/">Menu</Link>
          </p>
          <p>
            <Link to="/about/">About</Link>
          </p>
        </StyledBlock>
        <StyledBlock>
          <h1>Hours</h1>
          {hoursText}
        </StyledBlock>
        <StyledBlock>
          <h1>Address</h1>
          {addressText}
        </StyledBlock>
        <StyledBlock>
          <h1>Phone</h1>
          {phoneText}
        </StyledBlock>
      </StyledBlockWrapper>
      <StyledCopyright>
        {'© '}
        {new Date().getFullYear()}
        {' China King Oakville'}
      </StyledCopyright>
    </StyledFooter>
  );
};

export default Footer;

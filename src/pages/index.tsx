import React from 'react';
import { graphql } from 'gatsby';
import styled, { AnyStyledComponent } from 'styled-components';

import Hero from '../components/hero';
import Layout from '../components/layout';
import SEO from '../components/seo';

const StyledHomeContent: AnyStyledComponent = styled.section`
  border: solid blue;
  width: 500px;
`;

type heroNode = {
  frontmatter: {
    heroImage: string;
    heroImageAltText: string;
  };
  html: string;
};

type restaurantInfoNode = {
  frontmatter: {
    address: string[];
    hours: string[];
    phone: string[];
  };
};

interface HomeQueryProps {
  data: {
    hero: {
      nodes: heroNode[];
    };
    restaurantInfo: {
      nodes: restaurantInfoNode[];
    };
  };
}

const IndexPage: React.FC<HomeQueryProps> = ({ data }): JSX.Element => {
  const { heroImage, heroImageAltText } = data.hero.nodes[0].frontmatter;
  const homeContent = data.hero.nodes[0].html;
  const { address, hours, phone } = data.restaurantInfo.nodes[0].frontmatter;

  return (
    <Layout>
      <SEO title="Home" />
      <Hero
        heroImageFile={heroImage}
        altText={heroImageAltText}
        address={address}
        hours={hours}
        phone={phone}
      />
      <StyledHomeContent dangerouslySetInnerHTML={{ __html: homeContent }} />
      <StyledHomeContent>
        <h1>Hi bois</h1>
      </StyledHomeContent>
      <h3>What boi</h3>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    hero: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/home/" } }) {
      nodes {
        frontmatter {
          heroImage
          heroImageAltText
        }
        html
      }
    }
    restaurantInfo: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/info/" } }
    ) {
      nodes {
        frontmatter {
          address
          hours
          phone
        }
      }
    }
  }
`;

export default IndexPage;

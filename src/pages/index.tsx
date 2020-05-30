import React from 'react';
import { graphql } from 'gatsby';
import styled, { AnyStyledComponent } from 'styled-components';

import Hero from '../components/hero';
import Image from '../components/image';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { secondaryColor } from '../settings';

// FIXME: Better way besides using negative margins?
const StyledHomeContent: AnyStyledComponent = styled.section`
  display: flex;
  width: 60%;
  max-width: 800px;
  padding: 1rem 0 0 0;
  margin-bottom: -3rem;
  flex-direction: column;
  font-size: 36px;

  a {
    color: ${secondaryColor};
  }
`;

const StyledHomeImages: AnyStyledComponent = styled.div`
  width: 60%;
  max-width: 800px;
  margin-bottom: 7rem;

  img {
    margin: 7rem 0 0 0;
  }
`;

type heroNode = {
  frontmatter: {
    heroImage: string;
    heroImageAltText: string;
    imageList: string[];
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
  const {
    heroImage,
    heroImageAltText,
    imageList,
  } = data.hero.nodes[0].frontmatter;
  const homeContent = data.hero.nodes[0].html;
  const { address, hours, phone } = data.restaurantInfo.nodes[0].frontmatter;

  const images = imageList.map(element => {
    return <Image imageName={element} altText="Text" key={element} />;
  });

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
      <StyledHomeImages>{images}</StyledHomeImages>
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
          imageList
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

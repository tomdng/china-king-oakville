import React from 'react';
import { graphql } from 'gatsby';
import styled, { AnyStyledComponent } from 'styled-components';

import Hero from '../components/hero';
import Image from '../components/image';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { secondaryColor, tabletWidth, mobileWidth } from '../settings';

const StyledHomeContent: AnyStyledComponent = styled.section`
  display: flex;
  width: 60%;
  max-width: 800px;
  padding: 1rem 0 0 0;
  margin: -2rem 0 0 0;
  flex-direction: column;
  font-size: 36px;

  p {
    margin: 1rem 0;
  }

  a {
    color: ${secondaryColor};
    font-weight: 600;
  }

  @media (max-width: ${tabletWidth}) {
    width: 90%;
    max-width: 90%;
    padding: 0;
  }

  @media (max-width: ${mobileWidth}) {
    p {
      margin: 0.5rem 0;
    }

    h1 {
      margin-bottom: 1rem;
    }
  }
`;

const StyledHomeImages: AnyStyledComponent = styled.div`
  width: 60%;
  max-width: 800px;
  margin: 0 0 7rem 0;

  img {
    margin: 3rem 0 0 0;
  }

  @media (max-width: ${tabletWidth}) {
    width: 90%;
    max-width: 90%;
  }

  @media (max-width: ${mobileWidth}) {
    margin: 2rem 0 3rem 0;

    img {
      margin: 3rem 0 0 0;
    }
  }
`;

type heroNode = {
  frontmatter: {
    heroImage: string;
    heroImageAltText: string;
    imageList: string[];
    imageAltText: string[];
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
    imageAltText,
  } = data.hero.nodes[0].frontmatter;
  const homeContent = data.hero.nodes[0].html;
  const { address, hours, phone } = data.restaurantInfo.nodes[0].frontmatter;

  const images = imageList.map((imageName, index) => {
    return (
      <Image
        imageName={imageName}
        altText={imageAltText[index]}
        key={imageName}
      />
    );
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
    hero: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/home.md/" } }
    ) {
      nodes {
        frontmatter {
          heroImage
          heroImageAltText
          imageList
          imageAltText
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

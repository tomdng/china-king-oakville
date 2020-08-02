import React from 'react';
import { graphql } from 'gatsby';
import styled, { AnyStyledComponent } from 'styled-components';

import Image from '../components/image';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { secondaryColor, textSecondaryDark, mobileWidth } from '../settings';

const StyledQuickInfo: AnyStyledComponent = styled.section`
  width: 90%;
  max-width: 1500px;
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
`;

const StyledInfoBlockWrapper: AnyStyledComponent = styled.div`
  margin-top: -2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  h2 {
    font-family: 'Noto Serif';
    font-size: 24px;
    margin-bottom: 0;
  }

  p {
    margin: 0.5rem 0;
  }

  a {
    color: ${textSecondaryDark};
    text-decoration: none;
  }

  @media (max-width: ${mobileWidth}) {
    flex-direction: column;
  }
`;

const StyledStoryWrapper: AnyStyledComponent = styled.section`
  width: 60%;
  max-width: 800px;

  @media (max-width: ${mobileWidth}) {
    width: 90%;
  }
`;

const StyledStoryText: AnyStyledComponent = styled.div`
  margin-top: -1.5rem;

  p {
    margin-bottom: 2.5rem;
  }

  a {
    color: ${secondaryColor};
  }

  @media (max-width: ${mobileWidth}) {
    margin-top: 0;

    p {
      margin-bottom: 1.5rem;
    }
  }
`;

const StyledAboutImages: AnyStyledComponent = styled.div`
  width: 100%;
  margin-top: -5rem;
  margin-bottom: 7rem;

  img {
    margin: 7rem 0 0 0;
  }

  @media (max-width: ${mobileWidth}) {
    margin: 2rem 0 4rem 0;
    img {
      margin: 2rem 0;
    }
  }
`;

type restaurantInfoNode = {
  frontmatter: {
    address: string[];
    hours: string[];
    phone: string[];
  };
};

type aboutContentNode = {
  frontmatter: {
    imageList: string[];
    imageAltText: string[];
  };
  html: string;
};

interface AboutQueryProps {
  data: {
    restaurantInfo: {
      nodes: restaurantInfoNode[];
    };
    aboutContent: {
      nodes: aboutContentNode[];
    };
  };
}

const AboutPage: React.FC<AboutQueryProps> = ({ data }): JSX.Element => {
  const { address, hours, phone } = data.restaurantInfo.nodes[0].frontmatter;
  const { imageList, imageAltText } = data.aboutContent.nodes[0].frontmatter;
  const aboutHTMLContent = data.aboutContent.nodes[0].html;

  const addressText = address.map(addressLine => {
    return <p key={addressLine}>{addressLine}</p>;
  });

  const hoursText = hours.map(hourLine => {
    return <p key={hourLine}>{hourLine}</p>;
  });

  const phoneText = phone.map(phoneLine => {
    return <p key={phoneLine}>{phoneLine}</p>;
  });

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
      <SEO title="About" />
      <StyledQuickInfo>
        <h1>Quick Info</h1>
        <StyledInfoBlockWrapper>
          <div>
            <h2>Hours</h2>
            {hoursText}
          </div>
          <div>
            <h2>Address</h2>
            <a href="https://goo.gl/maps/YUUoKsvJy6Co51qt7">{addressText}</a>
          </div>
          <div>
            <h2>Phone</h2>
            {phoneText}
          </div>
        </StyledInfoBlockWrapper>
      </StyledQuickInfo>
      <StyledStoryWrapper>
        <h1>About Us</h1>
        <StyledStoryText
          dangerouslySetInnerHTML={{ __html: aboutHTMLContent }}
        />
        <StyledAboutImages>{images}</StyledAboutImages>
      </StyledStoryWrapper>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
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
    aboutContent: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/about/" } }
    ) {
      nodes {
        frontmatter {
          imageList
          imageAltText
        }
        html
      }
    }
  }
`;

export default AboutPage;

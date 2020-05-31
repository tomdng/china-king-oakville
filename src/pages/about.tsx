import React from 'react';
import { graphql } from 'gatsby';
import styled, { AnyStyledComponent } from 'styled-components';

import Image from '../components/image';
import Layout from '../components/layout';
import SEO from '../components/seo';

const StyledQuickInfo: AnyStyledComponent = styled.section`
  width: 90%;
  display: flex;
  flex-direction: row;
`;

const StyledInfoBlock: AnyStyledComponent = styled.div``;

const StyledStoryWrapper: AnyStyledComponent = styled.section`
  width: 50%;
`;

const StyledStoryText: AnyStyledComponent = styled.div``;

const StyledAboutImages: AnyStyledComponent = styled.div``;

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
        <StyledInfoBlock>
          <h2>Hours</h2>
          {hoursText}
        </StyledInfoBlock>
        <StyledInfoBlock>
          <h2>Address</h2>
          {addressText}
        </StyledInfoBlock>
        <StyledInfoBlock>
          <h2>Phone</h2>
          {phoneText}
        </StyledInfoBlock>
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

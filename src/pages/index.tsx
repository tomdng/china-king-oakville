import React from 'react';
import { Link, graphql } from 'gatsby';

import Hero from '../components/hero';
import Layout from '../components/layout';
import SEO from '../components/seo';

type heroNode = {
  frontmatter: {
    heroImage: string;
    heroImageAltText: string;
  };
};

interface HomeQueryProps {
  data: {
    hero: {
      nodes: heroNode[];
    };
  };
}

const IndexPage: React.FC<HomeQueryProps> = ({ data }): JSX.Element => {
  const { heroImage, heroImageAltText } = data.hero.nodes[0].frontmatter;

  return (
    <Layout>
      <SEO title="Home" />
      <Hero heroImageFile={heroImage} altText={heroImageAltText} />
      <h1>More text</h1>
      <h1>
        <Link to="/menu/">Link to menu</Link>
      </h1>
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
      }
    }
  }
`;

export default IndexPage;

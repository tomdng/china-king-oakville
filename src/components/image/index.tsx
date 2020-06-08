import React from 'react';
import Img from 'gatsby-image';
import styled, { AnyStyledComponent } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

const StyledImage: AnyStyledComponent = styled(Img)`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

interface ImageProps {
  imageName: string;
  altText: string;
}

const Image: React.FC<ImageProps> = ({ imageName, altText }): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      images: allFile(filter: { extension: { regex: "/png|jpg|jpeg|gif/" } }) {
        nodes {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid
            }
          }
          relativePath
        }
      }
    }
  `);

  const image = data.images.nodes.find(
    (element: { relativePath: string }): boolean => {
      return element.relativePath === imageName;
    }
  );

  return image ? (
    <StyledImage fluid={image.childImageSharp.fluid} alt={altText} />
  ) : (
    <p>No image found!</p>
  );
};

export default Image;

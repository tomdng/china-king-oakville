import React from 'react';
import styled, { AnyStyledComponent } from 'styled-components';

import Image from '../image';

const StyledHero: AnyStyledComponent = styled.div`
  height: calc(100vh - 6rem);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledImageWrapper: AnyStyledComponent = styled.div`
  height: 60%;
  width: 40%;
  margin: 1rem;
`;

const StyledTextGroup: AnyStyledComponent = styled.div`
  height: 60%;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface HeroProps {
  heroImageFile: string;
  altText: string;
}

const Hero: React.FC<HeroProps> = ({ heroImageFile, altText }): JSX.Element => {
  return (
    <StyledHero>
      <StyledImageWrapper>
        <Image imageName={heroImageFile} altText={altText} />
      </StyledImageWrapper>
      <StyledTextGroup>
        <h2>Info 1</h2>
        <h2>Info 2</h2>
        <h2>Info 3</h2>
        <h2>Info 4</h2>
      </StyledTextGroup>
    </StyledHero>
  );
};

export default Hero;

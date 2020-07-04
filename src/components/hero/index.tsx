import React from 'react';
import { Link } from 'gatsby';
import styled, { AnyStyledComponent } from 'styled-components';

import Image from '../image';
import { secondaryColor, tabletWidth, mobileWidth } from '../../settings';

const StyledHero: AnyStyledComponent = styled.div`
  min-height: calc(100vh - 8rem);
  width: 100%;
  margin: 2rem 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: ${tabletWidth}) {
    min-height: auto;
    flex-direction: column;
    margin: 4rem 0;
  }
`;

const StyledImageWrapper: AnyStyledComponent = styled.figure`
  height: 60%;
  width: 40%;
  margin-right: 1rem;

  @media (max-width: ${tabletWidth}) {
    width: 90%;
    margin: 0 0 4rem 0;
  }
`;

const StyledTextGroup: AnyStyledComponent = styled.div`
  height: 60%;
  width: 30%;
  margin-left: 4rem;
  font-family: 'Mukta';
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h2 {
    font-weight: 300;
    font-size: 24px;
  }

  h2:first-child {
    margin-top: 0;
  }

  h2:last-child {
    margin-bottom: 0;
  }

  a {
    color: ${secondaryColor};
  }

  @media (max-width: ${tabletWidth}) {
    width: 90%;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0;

    h2 {
      margin: 0;
      font-size: 20px;
      max-width: calc(75vw / 4);
    }
  }

  @media (max-width: ${mobileWidth}) {
    flex-direction: column;

    h2 {
      max-width: 90%;
      margin: 2rem 0;
    }
  }
`;

const BoldText: AnyStyledComponent = styled.span`
  color: ${secondaryColor};
  font-family: 'Noto Serif';
  font-size: 36px;
  font-weight: 900;

  @media (max-width: ${tabletWidth}) {
    font-size: 24px;
  }
`;

interface HeroProps {
  address: string[];
  altText: string;
  heroImageFile: string;
  hours: string[];
  phone: string[];
}

const Hero: React.FC<HeroProps> = ({
  address,
  altText,
  heroImageFile,
  hours,
  phone,
}): JSX.Element => {
  return (
    <StyledHero>
      <StyledImageWrapper>
        <Image imageName={heroImageFile} altText={altText} />
      </StyledImageWrapper>
      <StyledTextGroup>
        <h2>
          Chinese food located at
          <br />
          <BoldText>{address[0]}</BoldText>
          <br />
          in Tori Pines Plaza.
        </h2>
        <h2>
          Our hours are
          <br />
          <BoldText>{hours[0]}</BoldText>
          <br />
          <BoldText>{hours[1]}</BoldText>
          <br />
          <BoldText>{hours[2]}</BoldText>
          <br />
        </h2>
        <h2>
          Click the link below for
          <br />
          <BoldText>
            <Link to="/menu/">the menu.</Link>
          </BoldText>
        </h2>
        <h2>
          And to order, call us at
          <br />
          <BoldText>{`${phone[0]}`}</BoldText>
        </h2>
      </StyledTextGroup>
    </StyledHero>
  );
};

export default Hero;

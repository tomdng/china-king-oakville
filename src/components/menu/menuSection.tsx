import React, { useState, useEffect } from 'react';
import styled, { AnyStyledComponent } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { ArrowDropUp, ArrowDropDown } from '@styled-icons/material';

import {
  secondaryColor,
  textPrimaryDark,
  textSecondaryDark,
  tabletWidth,
  mobileWidth,
} from '../../settings';

const StyledMenuSection: AnyStyledComponent = styled.section`
  max-width: 36rem;
  margin: 0 2rem;
  display: flex;
  flex-direction: column;

  @media (max-width: ${tabletWidth}) {
    max-width: 90%;
  }
`;

const StyledSectionHeader: AnyStyledComponent = styled.div`
  margin: 0 0 0.5rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h2 {
    color: ${secondaryColor};
    font-family: 'Noto Serif';
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 1.5rem;
    max-width: 30rem;
  }

  &:hover {
    cursor: pointer;
    h2 {
      color: ${textPrimaryDark};
      text-decoration: underline;
    }

    svg {
      color: ${textPrimaryDark};
    }
  }

  @media (max-width: ${mobileWidth}) {
    h2 {
      font-size: 24px;
      max-width: 80%;
      margin-bottom: 1rem;
    }
  }
`;

const StyledIcon: AnyStyledComponent = styled.div`
  width: 6rem;
  margin-right: -1.25rem;
  color: ${secondaryColor};

  @media (max-width: ${mobileWidth}) {
    width: 4rem;
    margin-right: -0.75rem;
  }
`;

const StyledDescriptionText: AnyStyledComponent = styled.p`
  font-size: 20px !important;
  color: ${textSecondaryDark};
  margin: -1rem 0 1rem 0;

  @media (max-width: ${mobileWidth}) {
    font-size: 16px !important;
  }
`;

const StyledDishGroup: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${mobileWidth}) {
    margin: -1rem 0 2rem 0;
  }
`;

interface DishStyleProps {
  spicy: boolean;
}

const StyledDish: AnyStyledComponent = styled.article`
  color: ${(props: DishStyleProps) =>
    props.spicy ? secondaryColor : textPrimaryDark};
  margin: 0;
  padding: -2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 30px;
    font-weight: 300;
    margin: 0.5rem 0;
  }

  p {
    margin: -0.25rem 0 1rem 0;
    font-size: 20px;
    color: ${(props: DishStyleProps) =>
      props.spicy ? secondaryColor : textSecondaryDark};
  }

  @media (max-width: ${tabletWidth}) {
    h2 {
      font-size: 24px;
      margin: 1rem 0 0.25rem 0;
    }

    p {
      margin: 0 0 1rem 0;
      font-size: 16px;
    }
  }

  @media (max-width: ${mobileWidth}) {
    h2 {
      font-size: 20px;
    }

    p {
      font-size: 16px;
    }
  }
`;

const StyledMainDishInfo: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledDishPrice: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: row;

  p {
    font-weight: 900;
    margin-left: 1rem;
    font-size: 30px;
  }

  @media (max-width: ${mobileWidth}) {
    p {
      font-size: 20px;
    }
  }
`;

type MenuDish = {
  description: string;
  largePrice: number;
  name: string;
  smallPrice: number;
  spicy: boolean;
  category: string;
};

interface MenuSectionProps {
  name: string;
  desc: string;
}

const MenuSection: React.FC<MenuSectionProps> = ({
  name,
  desc,
}): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      dishes: allMenuXlsxDishes(sort: { fields: order }) {
        nodes {
          description
          largePrice
          name
          smallPrice
          spicy
          category
        }
      }
    }
  `);

  const menuDishes = data.dishes.nodes
    .filter((element: MenuDish) => element.category === name)
    .map((element: MenuDish) => {
      return (
        <StyledDish spicy={element.spicy} key={element.name}>
          <StyledMainDishInfo>
            <h2>{element.name}</h2>
            {element.description ? <p>{element.description}</p> : null}
          </StyledMainDishInfo>
          <StyledDishPrice>
            <p>{element.smallPrice}</p>
            <p>{element.largePrice}</p>
          </StyledDishPrice>
        </StyledDish>
      );
    });

  // Tablet and smaller device widthes shouldn't have the entire
  // menu categories expanded on load
  const [windowWidth, setWindowWidth] = useState(0);
  const [open, setOpen] = useState(windowWidth > 1200);

  useEffect(() => {
    if (window) setWindowWidth(window.innerWidth);
    if (windowWidth > 1200) setOpen(true);
  }, [windowWidth]);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <StyledMenuSection>
      <StyledSectionHeader onClick={toggleOpen}>
        <h2>{name}</h2>
        {open ? (
          <StyledIcon>
            <ArrowDropUp />
          </StyledIcon>
        ) : (
          <StyledIcon>
            <ArrowDropDown />
          </StyledIcon>
        )}
      </StyledSectionHeader>
      {desc ? (
        <StyledDescriptionText onClick={toggleOpen}>
          {desc}
        </StyledDescriptionText>
      ) : null}
      {open ? <StyledDishGroup>{menuDishes}</StyledDishGroup> : null}
    </StyledMenuSection>
  );
};

export default MenuSection;

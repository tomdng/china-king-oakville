import React, { useState } from 'react';
import styled, { AnyStyledComponent } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import { IconContext } from 'react-icons';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

import {
  secondaryColor,
  textPrimaryDark,
  textSecondaryDark,
} from '../../settings';

const StyledMenuSection: AnyStyledComponent = styled.section`
  max-width: 36rem;
  margin: 0 2rem;
  display: flex;
  flex-direction: column;
`;

const StyledSectionHeader: AnyStyledComponent = styled.div`
  margin: 0 0 0.5rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  h2 {
    color: ${secondaryColor};
    font-family: 'Noto Serif';
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 1.5rem;
    max-width: 30rem;
  }
`;

const StyledDescriptionText: AnyStyledComponent = styled.p`
  font-size: 20px !important;
  color: ${textSecondaryDark};
  margin: -1rem 0 1rem 0;
`;

const StyledDishGroup: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
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
        <StyledDish spicy={element.spicy}>
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

  const [open, setOpen] = useState(true);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <StyledMenuSection>
      <StyledSectionHeader onClick={toggleOpen}>
        <h2>{name}</h2>
        <IconContext.Provider
          value={{
            color: secondaryColor,
            size: '8rem',
            style: { margin: '0 -2.5rem -1rem 0' },
          }}
        >
          {open ? <MdArrowDropUp /> : <MdArrowDropDown />}
        </IconContext.Provider>
      </StyledSectionHeader>
      {desc ? <StyledDescriptionText>{desc}</StyledDescriptionText> : null}
      {open ? <StyledDishGroup>{menuDishes}</StyledDishGroup> : null}
    </StyledMenuSection>
  );
};

export default MenuSection;

import React from 'react';
import styled, { AnyStyledComponent } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import { textSecondaryDark } from '../../settings';

const StyledMenuSection: AnyStyledComponent = styled.section`
  border: solid blue;
  align-self: start;
  display: flex;
  flex-direction: column;
`;

const StyledSectionHeader: AnyStyledComponent = styled.div`
  margin-bottom: 0.5rem;

  h1 {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 1rem;
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

const StyledDish: AnyStyledComponent = styled.article`
  margin: 0;
  padding: -2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  p {
    margin: 0.75rem 0;
  }
`;

const StyledMainDishInfo: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledDishName: AnyStyledComponent = styled.p`
  font-size: 30px;
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
        <StyledDish>
          <StyledMainDishInfo>
            <StyledDishName>{element.name}</StyledDishName>
            {element.description ? (
              <StyledDescriptionText>
                {element.description}
              </StyledDescriptionText>
            ) : null}
          </StyledMainDishInfo>
          <StyledDishPrice>
            <p>{element.smallPrice}</p>
            <p>{element.largePrice}</p>
          </StyledDishPrice>
        </StyledDish>
      );
    });

  return (
    <StyledMenuSection>
      <StyledSectionHeader>
        <h1>{name}</h1>
      </StyledSectionHeader>
      {desc ? <StyledDescriptionText>{desc}</StyledDescriptionText> : null}
      <StyledDishGroup>{menuDishes}</StyledDishGroup>
    </StyledMenuSection>
  );
};

export default MenuSection;

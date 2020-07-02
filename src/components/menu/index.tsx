import React from 'react';
import styled, { AnyStyledComponent } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import MenuSection from './menuSection';
import { tabletWidth } from '../../settings';

const StyledMenu: AnyStyledComponent = styled.section`
  width: calc(90vw + 4rem);
  max-width: calc(1500px + 4rem);
  margin-bottom: 7.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: ${tabletWidth}) {
    flex-direction: column;
  }
`;

const StyledMenuColumn: AnyStyledComponent = styled.section`
  display: flex;
  flex-direction: column;
`;

type MenuSection = {
  name: string;
  description: string;
};

const Menu: React.FC = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      sections: allMenuXlsxCategories(sort: { fields: order }) {
        nodes {
          description
          name
          order
        }
      }
    }
  `);

  /* Cutoff represents the number of menu categories we want to have on
     the left side versus the right side. Two flexbox columns seemed to work
     better than CSS grid or CSS column properties.
  */
  const cutoff = 5;
  const menuSectionLeft = data.sections.nodes
    .slice(0, cutoff)
    .map((element: MenuSection) => {
      return (
        <MenuSection
          key={element.name}
          name={element.name}
          desc={element.description}
        />
      );
    });

  const menuSectionRight = data.sections.nodes
    .slice(cutoff, data.sections.nodes.length)
    .map((element: MenuSection) => {
      return (
        <MenuSection
          key={element.name}
          name={element.name}
          desc={element.description}
        />
      );
    });

  // Work on composition of menu sections
  return (
    <StyledMenu>
      <StyledMenuColumn>{menuSectionLeft}</StyledMenuColumn>
      <StyledMenuColumn>{menuSectionRight}</StyledMenuColumn>
    </StyledMenu>
  );
};

export default Menu;

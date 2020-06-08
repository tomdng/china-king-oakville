import React from 'react';
import styled, { AnyStyledComponent } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import MenuSection from './menuSection';

const StyledMenu: AnyStyledComponent = styled.section`
  width: 90vw;
  max-width: 1500px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
  grid-auto-flow: row dense;
  gap: 2rem 4rem;
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

  const menuSections = data.sections.nodes.map((element: MenuSection) => {
    return (
      <MenuSection
        key={element.name}
        name={element.name}
        desc={element.description}
      />
    );
  });

  // Work on composition of menu sections
  return <StyledMenu>{menuSections}</StyledMenu>;
};

export default Menu;

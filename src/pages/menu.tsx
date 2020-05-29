import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const MenuPage: React.FC = (): JSX.Element => (
  <Layout>
    <SEO title="Menu" />
    <h1>This the menu page</h1>
  </Layout>
);

export default MenuPage;

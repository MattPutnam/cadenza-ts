import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { GlobalStyle } from '../styles/global-styles';
import { EditView } from './views/edit';
import { PerformView } from './views/perform';

const Page = styled.div`
  background-color: black;
  height: 100vh;
`;

export const App = () => {
  const { i18n } = useTranslation();
  const [isEditing, setEditing] = React.useState(true);

  return (
    <Page>
      <Helmet htmlAttributes={{ lang: i18n.language }} />
      {isEditing ? <EditView perform={() => setEditing(false)} /> : <PerformView close={() => setEditing(true)} />}
      <GlobalStyle />
    </Page>
  );
};

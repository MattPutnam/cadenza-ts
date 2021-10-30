import React from 'react';

import _ from 'lodash';
import styled from 'styled-components';

import { colors, Container, icon } from '..';
import { useSynthesizers } from '../../../state';
import { PatchDefinition } from '../../../types';
import { Selectable, select } from '../utils';

const SearchField = styled.input`
  flex: 0 1 300px;
`;

const List = styled.div`
  align-self: stretch;
  padding: 0.25rem;
  overflow-y: auto;
`;

const StyledTable = styled.table`
  border-collapse: 'collapse';
`;

const StyledTr = styled.tr<Selectable>`
  cursor: pointer;
  background-color: ${select(colors.blue[2])};
`;

const NameColumn = styled.td`
  width: 99%;
`;

const OtherColumn = styled.td`
  white-space: nowrap;
`;

interface Props {
  selectedPatch: [string, string | undefined, number | [number, number] | undefined];
  setSelectedPatch: (patch: PatchDefinition) => void;
  alternate?: boolean;
}

const arrowColumn = <td>{icon('treeSeparator')}</td>;

export const SearchSection: React.FC<Props> = ({ selectedPatch, setSelectedPatch, alternate }) => {
  const { allPatches } = useSynthesizers();
  const [searchText, setSearchText] = React.useState('');

  const displayResults = !_.isEmpty(searchText);
  const txt = searchText.trim().toLowerCase();
  const results = displayResults ? allPatches.filter((patch) => patch.name.toLowerCase().indexOf(txt) !== -1) : [];

  return (
    <Container
      alternate={alternate}
      header={{
        contents: (
          <SearchField
            type="search"
            value={searchText}
            placeholder="Search..."
            onChange={(e) => setSearchText(e.target.value)}
          />
        )
      }}
    >
      {displayResults && (
        <List key={searchText}>
          <StyledTable>
            <tbody>
              {results.map((patch) => {
                const key = `${patch.name}#${patch.synthesizer}#${patch.bank}`;
                const selected = _.isEqual(selectedPatch, [patch.synthesizer, patch.bank, patch.number]);

                return (
                  <StyledTr selected={selected} key={key} onClick={() => setSelectedPatch(patch)}>
                    <NameColumn>{patch.name}</NameColumn>
                    <OtherColumn>{patch.synthesizer}</OtherColumn>
                    {arrowColumn}
                    <OtherColumn>{patch.bank}</OtherColumn>
                    {arrowColumn}
                    <OtherColumn>{patch.number}</OtherColumn>
                  </StyledTr>
                );
              })}
            </tbody>
          </StyledTable>
        </List>
      )}
    </Container>
  );
};

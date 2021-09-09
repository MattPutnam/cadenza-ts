import styled from 'styled-components';

export const Row = styled.div``;

const Title = styled.h2``;

export const StoryWrapper: React.FC<{ title: string }> = ({ title, children }) => (
  <div>
    <Title>{title}</Title>
    {children}
  </div>
);

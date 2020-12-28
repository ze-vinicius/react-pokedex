import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

// import { Container } from './styles';

interface IPokemonRouterProps {
  id: string;
}

type IPokemonProps = RouteComponentProps<IPokemonRouterProps>;

const Pokemon: React.FC<IPokemonProps> = ({ match }) => {
  const { id } = match.params;

  return <div />;
};

export default Pokemon;

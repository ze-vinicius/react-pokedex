import React from 'react';
import colors from '../../utils/colors';
import { Container } from './styles';

interface TypeBadgeProps {
  type: keyof typeof colors;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => (
  <Container type={type}>{type}</Container>
);

export default TypeBadge;

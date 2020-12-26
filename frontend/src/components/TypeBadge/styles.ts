import { shade } from 'polished';
import styled, { css } from 'styled-components';
import colors from '../../utils/colors';

interface ContainerProps {
  type: keyof typeof colors;
}

export const Container = styled.div<ContainerProps>`
  padding: 4px 10px 6px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 1px;
  text-align: center;
  font-size: 24px;

  ${props =>
    props.type &&
    css`
      box-shadow: -2px -2px ${shade(0.4, colors[props.type])} inset;
      background-color: ${colors[props.type]};
    `}
`;

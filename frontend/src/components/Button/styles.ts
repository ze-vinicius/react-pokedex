import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  border-radius: 8px;
  padding: 8px;
  border: solid 4px #404040;
  box-shadow: -4px -4px ${shade(0.2, '#2888EE')} inset;
  background-color: #2888ee;
  padding: 16px;

  width: 100%;
  font-size: 24px;
  /* margin-top: 16px; */

  /* transition: all 0.1s; */

  &:hover {
    background: ${shade(0.2, '#2888EE')};
    box-shadow: -2px -2px ${shade(0.6, '#2888EE')} inset;
  }

  color: #ffff;
  font-weight: 500;
`;

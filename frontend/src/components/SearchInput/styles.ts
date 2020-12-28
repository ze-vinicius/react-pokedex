import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  form {
    display: flex;
    align-items: center;

    input {
      flex: 1;
      padding: 12px 16px;
      border-radius: 8px 0 0 8px;
      border: solid 4px #404040;
      border-right: none;
      background-color: #fff;

      font-size: 24px;

      ::placeholder {
        color: #bdbdbd;
      }
    }

    button {
      position: relative;
      border-radius: 0 8px 8px 0;

      padding: 12px;
      border: solid 4px #404040;
      box-shadow: -4px -4px ${shade(0.2, '#2888EE')} inset;
      background-color: #2888ee;

      width: 100%;
      font-size: 24px;

      &:hover {
        background: ${shade(0.2, '#2888EE')};
        box-shadow: -1px -1px ${shade(0.6, '#2888EE')} inset;
      }

      color: #ffff;
      font-weight: 500;
    }
  }
`;

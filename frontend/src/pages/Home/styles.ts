import styled, { css } from 'styled-components';
import { Container as GridContainer } from 'react-grid-system';
import { shade } from 'polished';

import colors, { IPokeTypeName } from '../../utils/colors';

export const Container = styled(GridContainer)`
  min-height: 100vh;
  padding-top: 2.5vh;
`;

export const PokeInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-right: 24px;
`;

interface CardProps {
  backgroundColor?: IPokeTypeName;
}

export const Card = styled.div<CardProps>`
  border-radius: 8px;
  padding: 8px 10px 10px 8px;
  border: solid 4px #404040;
  background-color: #c4c4c4;
  width: 100%;
  image-rendering: pixelated;

  ${props =>
    props.backgroundColor &&
    css`
      background-color: ${colors[props.backgroundColor]};
      box-shadow: -2px -2px ${shade(0.4, colors[props.backgroundColor])} inset;
    `}

  transition: background-color 0.2s;
`;

export const PokeName = styled.div`
  /* width: 540px; */
  width: 100%;

  h1 {
    color: #fff;
    text-align: center;
    text-transform: capitalize;
  }
`;

interface PokeAvatarProps {
  src: string;
}

export const PokeAvatar = styled.div<PokeAvatarProps>`
  ${props =>
    props.src &&
    css`
      background: url(${props.src}) no-repeat center;
    `}
  background-size: contain;
  width: 100%;
  height: 350px;
  image-rendering: pixelated;

  transition: background-image 0.3s ease;
`;

export const TypeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 16px 0;

  div + div {
    margin-left: 16px;
  }
`;

export const Details = styled(Card)`
  width: 100%;

  > div {
    border-radius: 8px;
    padding: 24px;
    border: solid 4px #404040;
    background-color: #fff;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p {
      font-size: 32px;
    }

    p + p {
      margin-top: 16px;
    }
  }
`;

export const PokeList = styled(Card)`
  height: 95vh;

  > div {
    border-radius: 8px;
    overflow-y: auto;
    padding: 8px;
    border: solid 4px #404040;
    background-color: #fff;
    width: 100%;
    height: 100%;
  }
`;

interface ItemProps {
  selected: boolean;
}

export const Item = styled.button<ItemProps>`
  border: 4px solid transparent;
  border-radius: 4px;
  background: transparent;
  width: 100%;
  font-size: 24px;
  padding: 8px;
  margin-bottom: 8px;
  text-align: left;
  text-transform: capitalize;

  color: #404040;

  &:hover {
    color: ${shade(0.8, '#404040')};
    border-color: #404040;
  }

  ${props =>
    props.selected &&
    css`
      border-color: #404040;
    `}
`;

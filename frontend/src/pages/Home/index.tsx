import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-grid-system';
import InfiniteScroll from 'react-infinite-scroll-component';

import Button from '../../components/Button';
import TypeBadge from '../../components/TypeBadge';
import pokeApi from '../../services/pokeApi';
import { IPokeTypeName } from '../../utils/colors';

import {
  Card,
  Container,
  PokeList,
  PokeName,
  PokeAvatar,
  TypeContainer,
  Details,
  Item,
} from './styles';

interface IPokeList {
  count: number;
  next: string | null;
  previous: string | null;
  results: IResult[];
}

interface IResult {
  name: string;
  url: string;
}

interface IPokemon {
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
  };
  types: Array<{
    slot: number;
    type: {
      name: IPokeTypeName;
    };
  }>;
}

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const [pokemonsList, setPokemonsList] = useState<IPokeList>({} as IPokeList);
  const [pokemon, setPokemon] = useState<IPokemon>({} as IPokemon);

  useEffect(() => {
    const bootstrapAsync = async () => {
      const response = await pokeApi.get<IPokeList>('/pokemon');

      setPokemonsList(response.data);
    };

    bootstrapAsync();
  }, []);

  useEffect(() => {
    if (pokemonsList.results && pokemonsList.results.length === 20) {
      axios.get<IPokemon>(`${pokemonsList.results[0].url}`).then(response => {
        setPokemon(response.data);
        setLoading(false);
      });
    }
  }, [pokemonsList]);

  const handleChangePokemon = useCallback(async (newPokemonUrl: string) => {
    const response = await axios.get<IPokemon>(`${newPokemonUrl}`);
    setPokemon(response.data);
  }, []);

  const fetchMore = useCallback(async () => {
    const response = await axios.get<IPokeList>(`${pokemonsList.next}`);

    setPokemonsList({
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
      results: [...pokemonsList.results, ...response.data.results],
    });
  }, [pokemonsList]);

  if (loading) return <div />;

  return (
    <Container>
      <Row>
        <Col md={7}>
          {/* <PokeInfo> */}
          <Row>
            <Col>
              <Card backgroundColor={pokemon.types[0].type.name}>
                <PokeName>
                  <h1>{pokemon.name}</h1>
                </PokeName>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <PokeAvatar src={pokemon.sprites.front_default} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <TypeContainer>
                {pokemon.types.map(type => (
                  <TypeBadge key={type.slot} type={type.type.name} />
                ))}
              </TypeContainer>
            </Col>
          </Row>
          <Row>
            <Col md={9}>
              <Details backgroundColor={pokemon.types[0].type.name}>
                <div>
                  <p>{`WEIGHT ${pokemon.weight / 10} kg`}</p>
                  <p>{`HEIGHT ${pokemon.height / 10} mts`}</p>
                </div>
              </Details>
            </Col>
            <Col>
              <Button type="button">{`Info >`}</Button>
            </Col>
          </Row>
          {/* </PokeInfo> */}
        </Col>

        <Col md={5}>
          <PokeList backgroundColor={pokemon.types[0].type.name}>
            <div id="scrollableDiv">
              <InfiniteScroll
                dataLength={pokemonsList.results.length}
                next={fetchMore}
                hasMore
                loader={<h4>Loading...</h4>}
                endMessage={<p>Yay! You have seen it all</p>}
                scrollableTarget="scrollableDiv"
              >
                {pokemonsList.results.map((poke, index) => (
                  <Item
                    key={poke.name}
                    onClick={() => handleChangePokemon(poke.url)}
                    selected={pokemon.name === poke.name}
                  >
                    <p>
                      {`${String(index + 1).padStart(3, '0')} - ${poke.name}`}
                    </p>
                  </Item>
                ))}
              </InfiniteScroll>
            </div>
          </PokeList>
        </Col>
      </Row>
    </Container>
  );
};
export default Home;

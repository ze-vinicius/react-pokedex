import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-grid-system';
import InfiniteScroll from 'react-infinite-scroll-component';

import Button from '../../components/Button';
import SearchInput from '../../components/SearchInput';
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
  id: string;
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
  const [endMessage, setEndMessage] = useState('Yay! You have seen it all');

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

  const handleFilterPokemonsList = useCallback(async (id: string) => {
    try {
      if (id === '') {
        const response = await pokeApi.get<IPokeList>('/pokemon');

        setPokemonsList(response.data);
      } else {
        const response = await pokeApi.get<IPokemon>(
          `/pokemon/${String(id).toLowerCase()}`,
        );

        // const resp = await pokeApi.get<IPokeList>(
        //   `/pokemon?offset=0&limit=${response.data.id}`,
        // );

        // setPokemonsList(resp.data);

        setPokemonsList({
          count: 1,
          next: null,
          previous: null,
          results: [
            {
              name: response.data.name,
              url: `https://pokeapi.co/api/v2/pokemon/${response.data.id}/`,
            },
          ],
        });

        setEndMessage('Yay! You have seen it all');
      }
    } catch (error) {
      setPokemonsList({
        count: 0,
        next: null,
        previous: null,
        results: [],
      });

      setEndMessage(`Sorry! Pokémon "${id}" was not found!`);
    }
  }, []);

  const formatPokeIndex = useCallback((url: string) => {
    const [lastItem] = url.split('/').slice(-2);

    return String(lastItem).padStart(3, '0');
  }, []);

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
                  <p>{`HEIGHT ${pokemon.height / 10} m`}</p>
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
          <SearchInput
            type="text"
            placeholder="Search"
            handleSearch={handleFilterPokemonsList}
          />
          <PokeList backgroundColor={pokemon.types[0].type.name}>
            <div id="scrollableDiv">
              <InfiniteScroll
                dataLength={pokemonsList.results.length}
                next={fetchMore}
                hasMore={!!pokemonsList.next}
                loader={<h4>Loading...</h4>}
                endMessage={<p>{endMessage}</p>}
                scrollableTarget="scrollableDiv"
              >
                {pokemonsList.results.map(poke => (
                  <Item
                    key={poke.name}
                    onClick={() => handleChangePokemon(poke.url)}
                    selected={pokemon.name === poke.name}
                  >
                    <p>{`${formatPokeIndex(poke.url)} - ${poke.name}`}</p>
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

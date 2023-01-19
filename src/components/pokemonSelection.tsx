import * as React from 'react';
import Image from 'next/image'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { Dispatch, SetStateAction } from "react";
import { ArrowForwardIosTwoTone } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { Pokemon } from '../types/Pokemon'

export default function PokemonSelection({ setMyPokemon }: { setMyPokemon: Dispatch<SetStateAction<Pokemon | null>> }) {

  const [starterPokemons, setStarterPokemons] = React.useState<Pokemon[] | null>(null);

  React.useEffect(() => {
    const getStarterPokemons = async () => {
      const apiPaths = [
        'https://pokeapi.co/api/v2/pokemon/bulbasaur',
        'https://pokeapi.co/api/v2/pokemon/charmander',
        'https://pokeapi.co/api/v2/pokemon/squirtle'
      ]

      const pokemonsRaw = await Promise.all(
        apiPaths.map((path) =>
          fetch(path).then(data => {
            return data.json()
          }))
      )

      const pokemons = pokemonsRaw.map((pokemonRaw: any) => {
        return {
          name: pokemonRaw.name as string,
          hp: pokemonRaw.stats[0].base_stat as number,
          attack: pokemonRaw.stats[1].base_stat as number,
          defense: pokemonRaw.stats[2].base_stat as number,
          sprites: {
            back: pokemonRaw.sprites.back_default as string,
            front: pokemonRaw.sprites.front_default as string
          }
        } as Pokemon;
      }
      );

      setStarterPokemons(pokemons);

    };

    getStarterPokemons();

  }, []);

  return (
    <>
      <Stack spacing={1}>
        <Typography variant="h4" alignSelf="center">Choose your starter</Typography>
        <Box
          sx={{
            display: 'flex',
            '& > :not(style)': {
              m: 3,
              width: 200,
              height: 340,

            },
            width: '100%',
            justifyContent: 'center'
          }}
        >

          {starterPokemons?.map((pokemon, index) =>
            <IconButton key={index} onClick={() => setMyPokemon(pokemon)}>
              <Paper elevation={3}>
                <Stack spacing={1}>
                  <Image
                    src={pokemon.sprites.front}
                    alt="{pokemon.name} image"
                    width="200"
                    height="200"
                    priority
                  />
                  <Typography variant="h6" alignSelf="center">{pokemon.name}</Typography>
                  <Typography variant="caption" alignSelf="center">HP: {pokemon.hp}</Typography>
                  <Typography variant="caption" alignSelf="center">ATTACK: {pokemon.attack}</Typography>
                  <Typography variant="caption" alignSelf="center">DEFENSE: {pokemon.defense}</Typography>
                </Stack>
              </Paper>
            </IconButton>)
          }
        </Box>
      </Stack>
    </>
  )
}
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CatchingPokemonOutlinedIcon from '@mui/icons-material/CatchingPokemonOutlined';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
import PokemonSelection from '../src/components/pokemonSelection'

type Pokemon = {
  name: string,
  hp: number,
  attack: number,
  defense: number,
  sprites: {
    back: string,
    front: string
  }
}

export default function Home() {

  const [myPokemon, setMyPokemon] = React.useState<Pokemon | null>(null);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#0075BE' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <CatchingPokemonOutlinedIcon
                stroke="black"
                strokeWidth={1}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  mr: 1,
                  color: 'red',
                }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: '#FFDE00',
                  textDecoration: 'none',
                  textShadow: '0 0 3px #0A285F, 0 0 3px #0A285F, 0 0 3px #0A285F, 0 0 3px #0A285F'
                }}
              >
                POKEMON NEXT
              </Typography>
            </Toolbar>
          </Container>
        </AppBar >
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          width: '100%',
          height: '100vh',
          backgroundColor: '#FFCC00',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Container
          sx={{
            display: 'flex',
            width: '80vw',
            height: '75vh',
            backgroundColor: 'white',
            border: 'solid black',
            borderRadius: '8px',
            alignItems: 'center',
            justifyContent: 'center'
          }}>

          {/* TODO: check if pokemon in selected to decide if game will start or not */}
          {myPokemon
            ? myPokemon.name
            : <PokemonSelection setMyPokemon={setMyPokemon} />
          }

        </Container>
      </Box >

    </>
  );
}
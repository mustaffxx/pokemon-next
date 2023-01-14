import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function PokemonSelection() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          '& > :not(style)': {
            m: 3,
            width: 200,
            height: 340,

          },
          width: '100%',
          // border: 'solid red',
          justifyContent: 'center'
        }}
      >
        <Paper elevation={3} />
        <Paper elevation={3} />
        <Paper elevation={3} />
      </Box>
    </>
  )
}
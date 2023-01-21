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

interface IProps {
    myPokemon: Pokemon;
    setMyPokemon: Dispatch<SetStateAction<Pokemon | null>>;
}

export default function PokemonArena(props: IProps) {

    const [enemyPokemon, setEnemyPokemon] = React.useState<Pokemon | null>(null);

    // count get from https://pokeapi.co/api/v2/pokemon/
    const pokemonCount = 1279;
    React.useEffect(() => {
        const getEnemyPokemon = async () => {
            const randomPokemonId = Math.floor(Math.random() * pokemonCount + 1);

            // const randomRawPokemon = await
            //     fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`)
            //         .then((response) => {
            //             if (response.ok) return response.json();
            //             return null;
            //         }).catch((error) => {
            //             return null;
            //         });

            // if (!randomRawPokemon) {
            //     setEnemyPokemon(null);
            //     return;
            // }

            const randomRawResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);

            if (randomRawResponse.status === 404) {
                console.log('error occured <-----------');
                setEnemyPokemon(null);
                return;
            }

            const randomRawPokemon: Response = await randomRawResponse.json();

            const randomPokemon = {
                name: randomRawPokemon.name.toUpperCase() as string,
                hp: randomRawPokemon.stats[0].base_stat as number,
                attack: randomRawPokemon.stats[1].base_stat as number,
                defense: randomRawPokemon.stats[2].base_stat as number,
                sprites: {
                    back: randomRawPokemon.sprites.back_default as string,
                    front: randomRawPokemon.sprites.front_default as string
                }
            };
            console.log('randomPokemon: ', randomPokemon);
            setEnemyPokemon(randomPokemon);
        };

        if (enemyPokemon === null)
            getEnemyPokemon();

    }, []);

    return (
        <>
            <Stack spacing={3} alignItems='center'>
                <Box
                    sx={{
                        display: 'flex',
                        '& > :not(style)': {
                            m: 0,
                            width: '35vw',
                            height: '35vh',
                        },
                    }}
                >
                    <Paper elevation={1}
                        sx={{
                            display: 'flex',
                            padding: '10px'
                        }}>
                        <Box
                            sx={{
                                display: 'flex',
                                // backgroundColor: 'red',
                                width: '50%',
                                height: '100%',
                                justifyContent: 'start',
                                alignItems: 'end'

                            }}>
                            {/* <p>test0</p> */}
                            <Stack spacing={0}>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        backgroundColor: '#f9f7d9',
                                        border: 'solid 1px #223805',
                                        borderRadius: '10px',
                                        width: '200px',
                                        height: '50px',
                                        justifyContent: 'start',
                                        paddingLeft: '5px',
                                        paddingRight: '5px'
                                    }}>
                                    <Typography variant='caption italic'>
                                        {props.myPokemon.name}
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            backgroundColor: '#223805',
                                            width: '195px',
                                            height: '10px',
                                            border: 'solid 1px #223805',
                                            borderRadius: '15px',
                                            alignItems: 'center',
                                            paddingLeft: '3px'
                                        }}>
                                        <Typography variant='body1' color={'#e8b64b'} fontSize={10}>
                                            HP
                                        </Typography>
                                        <Box
                                            sx={{
                                                backgroundColor: '#81edac',
                                                width: '195px',
                                                height: '8px',
                                                border: 'solid 1px #223805',
                                                borderRadius: '10px'
                                            }} />
                                    </Box>
                                </Box>
                                <Image
                                    src={props.myPokemon.sprites.back}
                                    alt="{props.myPokemon.name} image"
                                    width="200"
                                    height="200"
                                    priority
                                />
                            </Stack>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                // backgroundColor: 'blue',
                                width: '50%',
                                height: '100%',
                                justifyContent: 'end',
                                alignItems: 'start',
                            }}>
                            <Stack spacing={0}>
                                {enemyPokemon &&
                                    <>
                                        < Image
                                            src={enemyPokemon.sprites.front}
                                            alt="{enemyPokemon.name} image"
                                            width="200"
                                            height="200"
                                            priority
                                        />
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                backgroundColor: '#f9f7d9',
                                                border: 'solid 1px #223805',
                                                borderRadius: '10px',
                                                width: '200px',
                                                height: '50px',
                                                justifyContent: 'start',
                                                paddingLeft: '5px',
                                                paddingRight: '5px'
                                            }}>
                                            <Typography variant='caption italic'>
                                                {enemyPokemon.name}
                                            </Typography>

                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    backgroundColor: '#223805',
                                                    width: '195px',
                                                    height: '10px',
                                                    border: 'solid 1px #223805',
                                                    borderRadius: '15px',
                                                    alignItems: 'center',
                                                    paddingLeft: '3px'
                                                }}>
                                                <Typography variant='body1' color={'#e8b64b'} fontSize={10}>
                                                    HP
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        backgroundColor: '#81edac',
                                                        width: '195px',
                                                        height: '8px',
                                                        border: 'solid 1px #223805',
                                                        borderRadius: '10px'
                                                    }} />
                                            </Box>
                                        </Box>
                                    </>
                                }

                            </Stack>
                        </Box>
                    </Paper>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        '& > :not(style)': {
                            m: 0,
                            width: '25vw',
                            height: '30vh',
                            backgroundColor: 'green',
                        },
                    }}
                >
                    <Paper elevation={1}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                        <p>test</p>
                    </Paper>
                </Box>
            </Stack >
        </>
    )
}
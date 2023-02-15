import * as React from 'react';
import Image from 'next/image'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { Dispatch, SetStateAction } from "react";
import { ArrowForwardIosTwoTone } from '@mui/icons-material';
import { Divider, List, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { Pokemon } from '../types/Pokemon'

interface IProps {
    myPokemon: Pokemon;
    setMyPokemon: Dispatch<SetStateAction<Pokemon | null>>;
}

export default function PokemonArena(props: IProps) {

    const [enemyPokemon, setEnemyPokemon] = React.useState<Pokemon | null>(null);
    const [myTurn, setMyTurn] = React.useState<boolean>(true);
    const [matchHistory, setMatchHistory] = React.useState<Array<String>>([]);

    function doABattle(): void {
        if (!props.myPokemon || !enemyPokemon) {
            console.log("-> ", props.myPokemon);
            console.log("-> ", enemyPokemon);
            return;
        }

        if (myTurn) {
            const attack = props.myPokemon.attack;
            const defense = enemyPokemon.defense;

            const damage = Math.floor((attack / defense) + (attack * Math.random()) * 0.25);

            setEnemyPokemon({ ...enemyPokemon, hp: enemyPokemon.hp - damage });
            setMatchHistory((prevState) => {
                return [
                    `${props.myPokemon.name} inflicted ${damage} damage to ${enemyPokemon.name}`,
                    ...prevState
                ];
            });
        } else {
            const attack = enemyPokemon.attack;
            const defense = props.myPokemon.defense;

            const damage = Math.floor((attack / defense) + (attack * Math.random()) * 0.25);

            props.setMyPokemon({ ...props.myPokemon, hp: props.myPokemon.hp - damage });
            setMatchHistory((prevState) => {
                return [
                    `${enemyPokemon.name} inflicted ${damage} damage to ${props.myPokemon.name}`,
                    ...prevState
                ]
            });
        }
        setMyTurn(!myTurn);
    }

    // count get from https://pokeapi.co/api/v2/pokemon/
    const pokemonCount = 1279;
    React.useEffect(() => {
        const getEnemyPokemon = async () => {
            let randomRawResponse: Response;

            for (let i = 0; i < 5; i++) {
                const randomPokemonId = Math.floor(Math.random() * pokemonCount + 1);

                randomRawResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);

                if (randomRawResponse.status == 200) break;
            }

            const randomRawPokemon = await randomRawResponse.json();

            const randomPokemon = {
                name: randomRawPokemon.name.toUpperCase() as string,
                hp: randomRawPokemon.stats[0].base_stat as number,
                attack: randomRawPokemon.stats[1].base_stat as number,
                defense: randomRawPokemon.stats[2].base_stat as number,
                sprites: {
                    back: randomRawPokemon.sprites.back_default as string,
                    front: randomRawPokemon.sprites.front_default as string
                }
            } as Pokemon;

            console.log(props.myPokemon);
            console.log(randomPokemon);

            setEnemyPokemon(randomPokemon);
        };

        if (enemyPokemon === null)
            getEnemyPokemon();

        const interval = setInterval(() => {
            doABattle();
            console.log(Date.now());
        }, 2000);

        return () => clearInterval(interval);
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
                            width: '35vw',
                            height: '30vh',
                            // backgroundColor: 'green',
                        },
                    }}
                >
                    <Paper elevation={1}>
                        <Stack>
                            <Typography sx={{ margin: '5px' }}
                                alignSelf="center">Match History</Typography>
                            <Divider variant="middle" />
                            <Stack
                                spacing={0}
                                style={{
                                    maxHeight: '25vh',
                                    overflow: 'auto',
                                    margin: '5px 0px 0px 10px',
                                    padding: '0px'
                                }}>
                                {matchHistory?.map((message, index) =>
                                    <p key={index}>{message}</p>
                                )}
                            </Stack>
                        </Stack>
                    </Paper>
                </Box>
            </Stack >
        </>
    )
}
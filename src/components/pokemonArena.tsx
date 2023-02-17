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

    function calculateHealthBarWidth(currentHP: number, minHP: number, maxHP: number, minWidth: number, maxWidth: number) {
        return Math.round(minWidth + (maxWidth - minWidth) * (currentHP - minHP) / (maxHP - minHP));
    }

    function calculateDamage(attack: number, defense: number): number {
        const baseDamage = (attack / defense) + (attack * Math.random()) * 0.25;
        return Math.floor(baseDamage);
    }

    function executeBattleRound(): void {
        if (!props.myPokemon || !enemyPokemon) return;

        if (!props.myPokemon.currenthp || !enemyPokemon.currenthp) return;

        const attacker = myTurn ? props.myPokemon : enemyPokemon;
        const defender = myTurn ? enemyPokemon : props.myPokemon;

        const attack = attacker.attack;
        const defense = defender.defense;

        let damage = calculateDamage(attack, defense);

        if (defender.currenthp - damage < 0) damage = defender.currenthp;

        myTurn
            ? setEnemyPokemon({ ...enemyPokemon, currenthp: defender.currenthp - damage })
            : props.setMyPokemon({ ...props.myPokemon, currenthp: defender.currenthp - damage })


        setMatchHistory((prevState) => [
            `${attacker.name} inflicted ${damage} damage to ${defender.name}`,
            ...prevState,
        ]);

        setMyTurn(!myTurn);
    }

    async function fetchPokemon(retries: number) {
        const randomPokemonId = Math.floor(Math.random() * 1280);

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);

        if (!response.ok) {
            if (retries > 0) {
                return fetchPokemon(retries - 1);
            }

            throw new Error('Fetch pokemon failed');
        }

        const data = await response.json();

        const randomPokemon: Pokemon = {
            name: data.name.toUpperCase(),
            hp: data.stats[0].base_stat,
            currenthp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            sprites: {
                back: data.sprites.back_default,
                front: data.sprites.front_default
            },
        };

        setEnemyPokemon(randomPokemon);
    };

    React.useEffect(() => {
        if (enemyPokemon === null) fetchPokemon(5);
    }, []);

    React.useEffect(() => {
        const interval = setInterval(() => {
            executeBattleRound();
        }, 2000);

        return () => clearInterval(interval);
    }, [enemyPokemon, myTurn]);

    return (
        <>
            <Stack spacing={3} alignItems='center'>
                <Box sx={{ display: 'flex' }}>
                    <Paper elevation={1} sx={{ display: 'flex', padding: '10px' }}>
                        <Box sx={{ display: 'flex', width: '50%', height: '100%', justifyContent: 'start', alignItems: 'end' }}>
                            <Stack spacing={0}>
                                <Box sx={{ display: 'grid', backgroundColor: '#f9f7d9', border: 'solid 1px #223805', borderRadius: '10px', width: '200px', height: '50px', justifyContent: 'start', paddingLeft: '5px', paddingRight: '5px' }}>
                                    <Typography variant='caption italic'>{props.myPokemon.name}</Typography>
                                    <Box sx={{ display: 'flex', backgroundColor: '#223805', width: '195px', height: '10px', border: 'solid 1px #223805', borderRadius: '15px', alignItems: 'center', paddingLeft: '3px' }}>
                                        <Typography variant='body1' color={'#e8b64b'} fontSize={10}>HP</Typography>
                                        <Box sx={{ backgroundColor: '#81edac', width: calculateHealthBarWidth(props.myPokemon.currenthp, 0, props.myPokemon.hp, 0, 195) + 'px', height: '8px', border: 'solid 1px #223805', borderRadius: '10px' }} />
                                    </Box>
                                </Box>
                                <Image src={props.myPokemon.sprites.back} alt="{props.myPokemon.name} image" width="200" height="200" priority />
                            </Stack>
                        </Box>
                        <Box sx={{ display: 'flex', width: '50%', height: '100%', justifyContent: 'end', alignItems: 'start' }}>
                            <Stack spacing={0}>
                                {enemyPokemon && (
                                    <>
                                        <Image src={enemyPokemon.sprites.front} alt="{enemyPokemon.name} image" width="200" height="200" priority />
                                        <Box sx={{ display: 'grid', backgroundColor: '#f9f7d9', border: 'solid 1px #223805', borderRadius: '10px', width: '200px', height: '50px', justifyContent: 'start', paddingLeft: '5px', paddingRight: '5px' }}>
                                            <Typography variant='caption italic'>{enemyPokemon.name}</Typography>
                                            <Box sx={{ display: 'flex', backgroundColor: '#223805', width: '195px', height: '10px', border: 'solid 1px #223805', borderRadius: '15px', alignItems: 'center', paddingLeft: '3px' }}>
                                                <Typography variant='body1' color={'#e8b64b'} fontSize={10}>HP</Typography>
                                                <Box sx={{ backgroundColor: '#81edac', width: calculateHealthBarWidth(enemyPokemon.currenthp, 0, enemyPokemon.hp, 0, 195) + 'px', height: '8px', border: 'solid 1px #223805', borderRadius: '10px' }} />
                                            </Box>
                                        </Box>
                                    </>
                                )}
                            </Stack>
                        </Box>
                    </Paper>
                </Box>

                <Box sx={{ display: 'flex', '& > :not(style)': { m: 0, width: '444px', height: '30vh' }, }} >
                    <Paper elevation={1}>
                        <Stack>
                            <Typography sx={{ margin: '5px' }} alignSelf="center">Match History</Typography>
                            <Divider variant="middle" />
                            <Stack
                                spacing={0}
                                style={{ maxHeight: '25vh', overflow: 'auto', margin: '5px 0px 0px 10px', padding: '0px', alignItems: 'center' }}>
                                {matchHistory?.map((message, index) =>
                                    <p key={index} style={{ fontSize: '5' }}>{message}</p>
                                )}
                            </Stack>
                        </Stack>
                    </Paper>
                </Box>
            </Stack >
        </>
    )
}
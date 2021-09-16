import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';

export default function Home() {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState(1);
    const { isLogged } = useContext(UserContext);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(poke => {
            // console.log("after json", poke);
            setPokemon(poke);
            setLoading(false);
        });
    }, [id]);

    function randomNumber() {
        return Math.floor(Math.random() * 151) + 1;
    }

    

    const loginRender = (
        <Link to="/login">
            <h1 className="text-center mt-4">You should login first !</h1>
        </Link>
    ) 

    const pokemonRender = (
        <div>
            {pokemon === null && loading === true ? (
                <div className="spinner-border text-primary" role="status"/>
            ) : (
                <>
                    <div className="card" style={{width: "18rem", height: 500}}>
                        <img src={pokemon?.sprites.other["official-artwork"].front_default} className="card-img-top" alt="Pokémon" />
                        <div className="card-body">
                            <h5 className="card-title text-capitalize">{pokemon.name}</h5>
                            <ul>
                                <li className="card-text">Height : {pokemon.height}</li>
                                <li className="card-text">Weight : {pokemon.weight}</li>
                            </ul>
                        </div>
                        <ul className="list-group list-group-flush">
                            {pokemon.types.map(type => (
                                <li key={type.type.name} className="list-group-item text-capitalize">{type.type.name}</li>
                            ))}
                        </ul>
                    </div>
                    <button className="btn btn-primary mt-3" onClick={() => setId(randomNumber)}>Random Pokémon</button>
                </>
            )}
        </div>
    );

    if (isLogged) {
        return pokemonRender;
    } else {
        return loginRender;
    }
}

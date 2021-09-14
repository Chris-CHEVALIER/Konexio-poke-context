import React, { useState, useEffect } from 'react';

export default function Home() {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState(1);

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
    
    return (
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
}

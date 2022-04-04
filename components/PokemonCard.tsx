import { Pokemon } from '../types/Pokemon'


export const PokemonCard: React.FC<{ pokemon: Pokemon, onClick: VoidFunction }> = ({ pokemon, onClick }) => {
    return (
        <div className='pokemon' onClick={onClick}>
            <div>
                <img src={pokemon.sprites.front_default} />
            </div>
            #{pokemon.id} <br />
            <span className='bold'>Name:</span> {pokemon.name}
            <div>
                <div className='types'>
                    Type:<br/>
                </div>
                {pokemon.types.map((({ type }) =>
                    <div className='type'><span className={type.name}>
                        {type.name}
                    </span>
                    </div>
                ))}
            </div>
        </div >

    )
}
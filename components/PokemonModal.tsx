import React from 'react'
import { Pokemon } from '../types/Pokemon'
import { ModalBody, Modal } from './modal';

export const PokemonModal: React.FC<{
    pokemon: Pokemon | null
    onClose: VoidFunction
}> = ({ pokemon, onClose }) => (<Modal show={!!pokemon} onClose={onClose}>
    <ModalBody>
        <div className="pokemon" onClick={onClose}>
            <div>
                <img src={pokemon?.sprites.front_default} />
            </div>
            #{pokemon?.id} <br />
            <span className='bold'>Name:</span> {pokemon?.name}
            <div>
                <div className='types'>
                    Type:<br/>
                </div>
                {pokemon?.types.map((({ type }) =>
                    <div className='type'><span className={type.name}>
                        {type.name}
                    </span>
                    </div>
                ))}
            </div>
            <span className='bold'>
                Stats:<br />
            </span>
            <span>
                Height: {pokemon?.height}
                <br />
                Weight: {pokemon?.weight}
            </span>
        </div>
    </ModalBody>
</Modal>)
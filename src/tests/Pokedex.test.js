import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../components';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  beforeEach(() => {
    renderWithRouter(
      <App>
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteId={ {} }
        />
      </App>,
    );
  });

  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando clicado', () => {
    const heading = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(heading).toBeInTheDocument();

    pokemons.forEach((pokemao) => {
      const poke = screen.getByText(pokemao.name);
      expect(poke).toBeInTheDocument();
      userEvent.click(heading);
    });
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const image = screen.getAllByRole('img');
    expect(image.length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const texts = screen.getAllByTestId('pokemon-type-button');
    const num = 7;
    expect(texts.length).toBe(num);

    const type = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    texts.forEach((data, i) => {
      expect(data).toHaveTextContent(type[i]);
    });

    const names = ['Pikachu', 'Charmander', 'Caterpie',
      'Ekans', 'Alakazam', 'Snorlax', 'Dragonair'];
    names.forEach((data, i) => {
      userEvent.click(texts[i]);
      const name = screen.getByTestId('pokemon-name');
      const types = screen.getByTestId('pokemon-type');
      const allButton = screen.getByRole('button', { name: /all/i });

      expect(name).toHaveTextContent(names[i]);
      expect(types).toHaveTextContent(type[i]);
      expect(texts[i]).toHaveTextContent(type[i]);
      expect(allButton).toBeInTheDocument();
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    const button = screen.getByRole('button', { name: /all/i });
    const heading = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(button);
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent('Pikachu');
    expect(button).toBeInTheDocument();
    expect(heading).not.toBeDisabled();
  });
});

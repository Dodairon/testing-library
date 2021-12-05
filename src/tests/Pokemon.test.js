import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

describe('Teste o componente <Pokemon.js />', () => {
  beforeEach(() => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite
      />,
    );
  });

  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const altImage = screen.getByAltText('Pikachu sprite');
    const src = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(name).toHaveTextContent('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    expect(altImage.src).toBe(src);
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém link de navegação', () => {
    const link = screen.getByText(/More Details/i);
    expect(link).toHaveAttribute('href', '/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const altImage = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(altImage.src).toBe('http://localhost/star-icon.svg');
  });
});

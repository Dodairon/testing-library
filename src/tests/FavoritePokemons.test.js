import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const texts = screen.getByText(/No favorite pokemon found/i);
    expect(texts).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /More details/i });

    userEvent.click(home);

    const pokemao = screen.getByText(/Pokémon favoritado?/i);

    userEvent.click(pokemao);

    history.push('/favorites');

    const texts = screen.getByText(/pikachu/i);
    expect(texts).toBeInTheDocument();
  });
});

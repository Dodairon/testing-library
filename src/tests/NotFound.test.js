import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    render(<NotFound />);
    const heading = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(heading).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem:', () => {
    render(<NotFound />);
    const image = screen.getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );
    const srcImage = ('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(image.src).toBe(srcImage);
  });
});

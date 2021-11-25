import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App', () => {
  render(<App />);
  // const linkElement = screen.getByText(/Detail/i);
  // expect(linkElement).toBeInTheDocument();

  const navMain = screen.getByTestId('navMain');
  expect(navMain).toBeInTheDocument();
});

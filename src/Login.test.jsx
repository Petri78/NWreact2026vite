import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login'
import { expect, test } from 'vitest';

test('Lomakkeesta löytyy käyttäjätunnus-kenttä placeholderin avulla', () => {
  render(<Login />);
  const usernameField = screen.getByPlaceholderText(/käyttäjätunnus/i);

  expect(usernameField).toBeInTheDocument();
});

test('Lomakkeesta löytyy salasana-kenttä', () => {
  render(<Login />);
  const passwordField = screen.getByPlaceholderText(/salasana/i);
  expect(passwordField).toBeInTheDocument();
});

test('Login-nappi löytyy tekstin perusteella', () => {
  render(<Login />);
  const loginButton = screen.getByRole('button', { name: /login/i });
  expect(loginButton).toBeInTheDocument();
});

test('Mitä testi näkee', () => {
  render(<Login />);
  screen.debug();
});
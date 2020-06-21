import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Clock from './components/Clock';
import Greeting from './components/Greeting';
import Votd from './components/Verse/Votd';

test('renders time', () => {
  const { getByText } = render(<Clock />);
  const clockElement = getByText(/\d{2}:\d{2}|\d{1}:\d{2}/i);
  expect(clockElement).toBeInTheDocument();
});

test('renders greeting', () => {
  const { getByText } = render(<Greeting />);
  const greetingElement = getByText(/Good .*/i);
  expect(greetingElement).toBeInTheDocument();
});

test('renders verse of the day', () => {
  const { getByText } = render(<Votd />);
  const votdTextElement = getByText(/For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life\./i);
  const votdRefElement = getByText(/John 3:16/i);
  expect(votdTextElement).toBeInTheDocument();
  expect(votdRefElement).toBeInTheDocument();
});

test('renders Youversion link', () => {
  const { getByText } = render(<App />);
  const youversionLinkElement = getByText(/YouVersion/i);
  expect(youversionLinkElement).toBeInTheDocument();
});

test('renders Unsplash link', () => {
  const { getByText } = render(<App />);
  const unsplashLinkElement = getByText(/Unsplash/i);
  expect(unsplashLinkElement).toBeInTheDocument();
});

test('renders source link', () => {
  const { getByText } = render(<App />);
  const sourceLinkElement = getByText(/@jamesang17/i);
  expect(sourceLinkElement).toBeInTheDocument();
});

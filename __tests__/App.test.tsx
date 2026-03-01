import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../src/App';

test('renders the enchiladas counter button', () => {
  render(<App />);
  expect(screen.getByRole('button')).toHaveTextContent('Enchiladas 0');
});

test('increments the counter on click', () => {
  render(<App />);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(button).toHaveTextContent('Enchiladas 1');
});

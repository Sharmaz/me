import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import About from '../src/components/About';

test('renders about text and profile picture', () => {
  render(<About about="Frontend Developer based in Mexico." profilePic="https://example.com/pic.jpg" />);

  expect(screen.getByText('Frontend Developer based in Mexico.')).toBeInTheDocument();

  const img = screen.getByRole('img', { name: 'Profile' });
  expect(img).toHaveAttribute('src', 'https://example.com/pic.jpg');
});

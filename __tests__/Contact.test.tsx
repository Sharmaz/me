import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Contact from '../src/components/Contact';

test('renders heading and mailto link with the given email', () => {
  render(<Contact email="ivan@example.com" />);

  const heading = screen.getByRole('heading', { level: 2 });
  expect(heading).toHaveTextContent(/let's work/i);
  expect(heading).toHaveTextContent(/together/i);

  const link = screen.getByRole('link', { name: 'ivan@example.com' });
  expect(link).toHaveAttribute('href', 'mailto:ivan@example.com');
});

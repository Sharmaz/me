import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import Hero from '../src/components/Hero';

vi.mock('../src/components/HeroScene', () => ({
  __esModule: true,
  default: () => null,
}));

test('renders name, tagline, and CTA links', () => {
  render(<Hero name="Ivan Robles" resume="https://example.com/resume.pdf" animate={false} />);

  expect(screen.getByRole('heading', { name: 'Ivan Robles' })).toBeInTheDocument();
  expect(screen.getByText('Frontend Developer')).toBeInTheDocument();

  const resumeLink = screen.getByRole('link', { name: 'Download Resume' });
  expect(resumeLink).toHaveAttribute('href', 'https://example.com/resume.pdf');
  expect(resumeLink).toHaveAttribute('target', '_blank');

  expect(screen.getByRole('link', { name: 'View Work' })).toHaveAttribute('href', '#work');
});

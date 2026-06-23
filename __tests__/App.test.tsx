import { test, expect, vi, type Mock } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from '../src/App';

vi.mock('../src/hooks/usePortfolio', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('../src/hooks/useLenis', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('../src/components/HeroScene', () => ({
  __esModule: true,
  default: () => null,
}));

vi.mock('../src/components/SceneCanvas', () => ({
  __esModule: true,
  default: () => null,
}));

vi.mock('../src/components/LoaderScramble', () => ({
  __esModule: true,
  default: ({ onComplete: _onComplete }: { onComplete: () => void }) => (
    <div data-testid="loader">Loader</div>
  ),
}));

import usePortfolio from '../src/hooks/usePortfolio';

const mockUsePortfolio = usePortfolio as Mock;

test('renders error state', () => {
  mockUsePortfolio.mockReturnValue({ data: null, error: 'Network error' });

  render(<App />);

  expect(screen.getByText('Network error')).toBeInTheDocument();
});

test('renders loader on initial mount', () => {
  mockUsePortfolio.mockReturnValue({
    data: { profile: { name: 'Ivan Robles', resume: '' }, jobs: [], projects: [] },
    error: null,
  });

  render(<App />);

  expect(screen.getByTestId('loader')).toBeInTheDocument();
});

test('renders hero content while loader is visible', () => {
  mockUsePortfolio.mockReturnValue({
    data: { profile: { name: 'Ivan Robles', resume: '' }, jobs: [], projects: [] },
    error: null,
  });

  render(<App />);

  expect(screen.getByRole('heading', { name: 'Ivan Robles' })).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../src/App';

jest.mock('../src/hooks/usePortfolio', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../src/hooks/useLenis', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../src/components/HeroScene', () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock('../src/components/SceneCanvas', () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock('../src/components/LoaderScramble', () => ({
  __esModule: true,
  default: ({ onComplete: _onComplete }: { onComplete: () => void }) => (
    <div data-testid="loader">Loader</div>
  ),
}));

import usePortfolio from '../src/hooks/usePortfolio';

const mockUsePortfolio = usePortfolio as jest.Mock;

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

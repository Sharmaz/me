import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../src/App';

jest.mock('../src/hooks/usePortfolio', () => ({
  __esModule: true,
  default: jest.fn(),
}));

import usePortfolio from '../src/hooks/usePortfolio';

const mockUsePortfolio = usePortfolio as jest.Mock;

test('renders loading state', () => {
  mockUsePortfolio.mockReturnValue({ data: null, loading: true, error: null });

  render(<App />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('renders error state', () => {
  mockUsePortfolio.mockReturnValue({ data: null, loading: false, error: 'Network error' });

  render(<App />);

  expect(screen.getByText('Network error')).toBeInTheDocument();
});

test('renders profile name on success', () => {
  mockUsePortfolio.mockReturnValue({
    data: { profile: { name: 'Ivan Robles' } },
    loading: false,
    error: null,
  });

  render(<App />);

  expect(screen.getByText('Ivan Robles')).toBeInTheDocument();
});

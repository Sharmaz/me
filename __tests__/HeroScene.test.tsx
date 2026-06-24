import { test, expect, vi, beforeAll, afterAll } from 'vitest';
import { render } from '@testing-library/react';

vi.mock('@react-three/fiber', () => ({
  __esModule: true,
  Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="canvas">{children}</div>,
  useFrame: () => {},
}));

import HeroScene from '../src/components/HeroScene';

// The mocked Canvas renders real R3F intrinsics (mesh, shaderMaterial, ...) as plain DOM
// tags, which React warns about — noise from the mock, not a real issue.
let consoleError: typeof console.error;

beforeAll(() => {
  consoleError = console.error;
  console.error = () => {};
});

afterAll(() => {
  console.error = consoleError;
});

test('renders the canvas without crashing', () => {
  const { getByTestId } = render(<HeroScene />);

  expect(getByTestId('canvas')).toBeInTheDocument();
});

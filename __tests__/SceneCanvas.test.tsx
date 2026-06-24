import { test, expect, vi, beforeAll, afterAll } from 'vitest';
import { render } from '@testing-library/react';

vi.mock('@react-three/fiber', () => ({
  __esModule: true,
  Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="canvas">{children}</div>,
  useFrame: () => {},
}));

import SceneCanvas from '../src/components/SceneCanvas';

// The mocked Canvas renders real R3F intrinsics (mesh, lineSegments, ...) as plain DOM
// tags, which React warns about — noise from the mock, not a real issue.
let consoleError: typeof console.error;

beforeAll(() => {
  consoleError = console.error;
  console.error = () => {};
});

afterAll(() => {
  console.error = consoleError;
});

test('renders the canvas with one hex prism per configured hex', () => {
  const { getByTestId, container } = render(<SceneCanvas />);

  expect(getByTestId('canvas')).toBeInTheDocument();
  expect(container.querySelectorAll('mesh')).toHaveLength(10);
  expect(container.querySelectorAll('linesegments')).toHaveLength(10);
});

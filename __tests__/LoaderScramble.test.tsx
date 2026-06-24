import { test, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';

import LoaderScramble from '../src/components/LoaderScramble';

test('calls onComplete once the scramble animation finishes', async () => {
  const onComplete = vi.fn();

  render(<LoaderScramble onComplete={onComplete} />);

  await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1), { timeout: 6000 });
}, 7000);

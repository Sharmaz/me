import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Experience from '../src/components/Experience';
import type { Job } from '../src/types';

const jobs: Job[] = [
  {
    id: 'job-1',
    userId: 'user-1',
    name: 'Company B',
    role: 'Senior Frontend Developer',
    dateStarted: '2023-06-01',
    dateEnded: '2024-01-01',
    description: 'Led frontend team',
    details: null,
  },
  {
    id: 'job-2',
    userId: 'user-1',
    name: 'Company A',
    role: 'Frontend Developer',
    dateStarted: '2022-01-01',
    dateEnded: '2023-01-01',
    description: 'Worked on React apps',
    details: { list: ['Built components', 'Wrote tests'] },
  },
];

test('renders jobs in the order received', () => {
  render(<Experience jobs={jobs} />);

  const roles = screen.getAllByRole('heading', { level: 3 }).map((el) => el.textContent);
  expect(roles).toEqual(['Senior Frontend Developer', 'Frontend Developer']);
});

test('renders company name and description for each job', () => {
  render(<Experience jobs={jobs} />);

  expect(screen.getByText('Company B')).toBeInTheDocument();
  expect(screen.getByText('Led frontend team')).toBeInTheDocument();
  expect(screen.getByText('Company A')).toBeInTheDocument();
  expect(screen.getByText('Worked on React apps')).toBeInTheDocument();
});

test('renders detail bullets only when details.list is present', () => {
  render(<Experience jobs={jobs} />);

  expect(screen.getByText('Built components')).toBeInTheDocument();
  expect(screen.getByText('Wrote tests')).toBeInTheDocument();
  expect(screen.queryAllByRole('listitem')).toHaveLength(2);
});

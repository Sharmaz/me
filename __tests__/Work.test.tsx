import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Work from '../src/components/Work';
import type { Project } from '../src/types';

const makeProject = (overrides: Partial<Project>): Project => ({
  id: 'project-1',
  userId: 'user-1',
  name: 'Project',
  description: 'Description',
  githubLink: '',
  demoLink: '',
  imageLink: '',
  tags: null,
  ...overrides,
});

test('renders nothing when there are no projects', () => {
  const { container } = render(<Work projects={[]} />);

  expect(container).toBeEmptyDOMElement();
});

test('renders the first project as featured and the rest in a grid', () => {
  const projects = [
    makeProject({ id: 'p1', name: 'Featured Project' }),
    makeProject({ id: 'p2', name: 'Second Project' }),
    makeProject({ id: 'p3', name: 'Third Project' }),
  ];

  render(<Work projects={projects} />);

  const names = screen.getAllByRole('heading', { level: 3 }).map((el) => el.textContent);
  expect(names).toEqual(['Featured Project', 'Second Project', 'Third Project']);
});

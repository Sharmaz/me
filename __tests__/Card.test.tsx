import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Card from '../src/components/Card';
import type { Project } from '../src/types';

const baseProject: Project = {
  id: 'project-1',
  userId: 'user-1',
  name: 'My Project',
  description: 'A cool project',
  githubLink: 'https://github.com/sharmaz/project',
  demoLink: 'https://project.example.com',
  imageLink: 'https://example.com/image.jpg',
  tags: { list: ['React', 'TypeScript'] },
};

test('renders project name, description, image, and tags', () => {
  render(<Card project={baseProject} />);

  expect(screen.getByText('My Project')).toBeInTheDocument();
  expect(screen.getByText('A cool project')).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'My Project' })).toHaveAttribute('src', baseProject.imageLink);
  expect(screen.getByText('React')).toBeInTheDocument();
  expect(screen.getByText('TypeScript')).toBeInTheDocument();
});

test('renders demo and github links when present', () => {
  render(<Card project={baseProject} />);

  expect(screen.getByRole('link', { name: 'Live →' })).toHaveAttribute('href', baseProject.demoLink);
  expect(screen.getByRole('link', { name: 'GitHub →' })).toHaveAttribute('href', baseProject.githubLink);
});

test('omits links and image when fields are missing', () => {
  const project: Project = { ...baseProject, demoLink: '', githubLink: '', imageLink: '', tags: null };

  render(<Card project={project} />);

  expect(screen.queryByRole('link', { name: 'Live →' })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'GitHub →' })).not.toBeInTheDocument();
  expect(screen.queryByRole('img')).not.toBeInTheDocument();
});

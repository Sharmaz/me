import { renderHook, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import usePortfolio from '../src/hooks/usePortfolio';
import type { PortfolioData } from '../src/types';

jest.mock('../src/config', () => ({
  config: {
    apiKey: 'test-api-key',
    baseUrl: 'http://localhost:8080',
    userId: 'test-user-id',
  },
}));

const mockPortfolioData: PortfolioData = {
  id: 'user-1',
  email: 'test@test.com',
  profile: {
    id: 'profile-1',
    userId: 'user-1',
    name: 'Ivan Robles',
    profilePic: 'https://example.com/pic.jpg',
    about: 'Frontend Developer',
    blog: 'https://blog.example.com',
    github: 'https://github.com/sharmaz',
    linkedIn: 'https://linkedin.com/in/sharmaz',
    twitter: 'https://twitter.com/sharmaz',
    resume: 'https://example.com/resume.pdf',
  },
  jobs: [
    {
      id: 'job-1',
      userId: 'user-1',
      name: 'Company A',
      role: 'Frontend Developer',
      dateStarted: '2022-01-01',
      dateEnded: '2023-01-01',
      description: 'Worked on React apps',
      details: { list: ['Built components', 'Wrote tests'] },
    },
    {
      id: 'job-2',
      userId: 'user-1',
      name: 'Company B',
      role: 'Senior Frontend Developer',
      dateStarted: '2023-06-01',
      dateEnded: '2024-01-01',
      description: 'Led frontend team',
      details: null,
    },
  ],
  projects: [
    {
      id: 'project-1',
      userId: 'user-1',
      name: 'My Project',
      description: 'A cool project',
      githubLink: 'https://github.com/sharmaz/project',
      demoLink: 'https://project.example.com',
      imageLink: 'https://example.com/image.jpg',
      tags: { list: ['React', 'TypeScript'] },
    },
  ],
};

beforeEach(() => {
  jest.resetAllMocks();
});

test('returns loading state initially', () => {
  global.fetch = jest.fn(() => new Promise(() => {}));

  const { result } = renderHook(() => usePortfolio());

  expect(result.current.loading).toBe(true);
  expect(result.current.data).toBeNull();
  expect(result.current.error).toBeNull();
});

test('returns portfolio data on success with jobs sorted by dateStarted descending', async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockPortfolioData),
  } as Response),
  );

  const { result } = renderHook(() => usePortfolio());

  await waitFor(() => expect(result.current.loading).toBe(false));

  expect(result.current.data).not.toBeNull();
  expect(result.current.error).toBeNull();
  expect(result.current.data?.jobs[0].name).toBe('Company B');
  expect(result.current.data?.jobs[1].name).toBe('Company A');
});

test('returns error on network failure', async () => {
  global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

  const { result } = renderHook(() => usePortfolio());

  await waitFor(() => expect(result.current.loading).toBe(false));

  expect(result.current.data).toBeNull();
  expect(result.current.error).toBe('Network error');
});

test('returns error on non-ok response', async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    ok: false,
    status: 401,
  } as Response),
  );

  const { result } = renderHook(() => usePortfolio());

  await waitFor(() => expect(result.current.loading).toBe(false));

  expect(result.current.data).toBeNull();
  expect(result.current.error).toBe('Request failed with status 401');
});

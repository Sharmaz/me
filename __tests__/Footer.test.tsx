import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Footer from '../src/components/Footer';
import type { Profile } from '../src/types';

const baseProfile: Profile = {
  id: 'profile-1',
  userId: 'user-1',
  name: 'Ivan Robles',
  profilePic: '',
  about: '',
  blog: 'https://blog.example.com',
  github: 'https://github.com/sharmaz',
  linkedIn: 'https://linkedin.com/in/sharmaz',
  twitter: 'https://twitter.com/sharmaz',
  resume: '',
};

test('renders name and current year in the copyright line', () => {
  render(<Footer profile={baseProfile} />);

  const year = new Date().getFullYear().toString();
  expect(screen.getByText(new RegExp(`${year}.*Ivan Robles`))).toBeInTheDocument();
});

test('renders social links when present', () => {
  render(<Footer profile={baseProfile} />);

  expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', baseProfile.github);
  expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', baseProfile.linkedIn);
  expect(screen.getByRole('link', { name: 'Twitter' })).toHaveAttribute('href', baseProfile.twitter);
  expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', baseProfile.blog);
});

test('omits social links that are missing', () => {
  const profile: Profile = { ...baseProfile, github: '', linkedIn: '', twitter: '', blog: '' };

  render(<Footer profile={profile} />);

  expect(screen.queryByRole('link', { name: 'GitHub' })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'LinkedIn' })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Twitter' })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Blog' })).not.toBeInTheDocument();
});

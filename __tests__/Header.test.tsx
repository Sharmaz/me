import { test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import Header from '../src/components/Header';

test('renders brand name and nav links', () => {
  render(<Header name="Ivan Robles" animate={false} />);

  expect(screen.getByRole('link', { name: 'Ivan Robles' })).toBeInTheDocument();

  const aboutLinks = screen.getAllByRole('link', { name: 'About' });
  expect(aboutLinks[0]).toHaveAttribute('href', '#about');
  expect(screen.getAllByRole('link', { name: 'Experience' })[0]).toHaveAttribute('href', '#experience');
  expect(screen.getAllByRole('link', { name: 'Work' })[0]).toHaveAttribute('href', '#work');
  expect(screen.getAllByRole('link', { name: 'Contact' })[0]).toHaveAttribute('href', '#contact');
});

test('toggles the mobile menu open state on hamburger click', () => {
  render(<Header name="Ivan Robles" animate={false} />);

  const [, mobileNav] = screen.getAllByRole('navigation');
  const menuContainer = mobileNav.parentElement as HTMLElement;

  expect(menuContainer.style.pointerEvents).toBe('none');

  fireEvent.click(screen.getByRole('button', { name: 'Toggle menu' }));

  expect(menuContainer.style.pointerEvents).toBe('auto');

  fireEvent.click(screen.getByRole('button', { name: 'Toggle menu' }));

  expect(menuContainer.style.pointerEvents).toBe('none');
});

test('closes the mobile menu when a link is clicked', () => {
  render(<Header name="Ivan Robles" animate={false} />);

  const [, mobileNav] = screen.getAllByRole('navigation');
  const menuContainer = mobileNav.parentElement as HTMLElement;

  fireEvent.click(screen.getByRole('button', { name: 'Toggle menu' }));
  expect(menuContainer.style.pointerEvents).toBe('auto');

  fireEvent.click(screen.getAllByRole('link', { name: 'About' })[1]);

  expect(menuContainer.style.pointerEvents).toBe('none');
});

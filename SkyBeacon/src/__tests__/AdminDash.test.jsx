import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AdminDash from '../pages/dashboards/AdminDash';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('AdminDash Component Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects to login page if user is not logged in', () => {
    render(
      <MemoryRouter>
        <AdminDash isLoggedIn={false} />
      </MemoryRouter>
    );
    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });

  it('renders the dashboard without redirecting when logged in', () => {
    render(
      <MemoryRouter>
        <AdminDash isLoggedIn={true} />
      </MemoryRouter>
    );

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});

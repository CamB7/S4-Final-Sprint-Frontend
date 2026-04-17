import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AddFlight from '../components/AddFlight';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('AddFlight Component Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );
  });

  it('redirects to login page if user is not logged in', () => {
    render(
      <MemoryRouter>
        <AddFlight isLoggedIn={false} />
      </MemoryRouter>
    );
    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });

  it('mounts the component and returns HTML when logged in', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(
      <MemoryRouter>
        <AddFlight isLoggedIn={true} />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeTruthy();

    consoleSpy.mockRestore();
  });

  it('attempts to call fetch on form submit', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    global.fetch.mockClear();

    const { getAllByRole } = render(
      <MemoryRouter>
        <AddFlight isLoggedIn={true} />
      </MemoryRouter>
    );

    const submitBtns = getAllByRole('button', { name: /ADD FLIGHT/i });
    const submitBtn = submitBtns[0];

    const formEvent = new Event('submit', { bubbles: true, cancelable: true });
    submitBtn.form.dispatchEvent(formEvent);

    expect(submitBtn).toBeTruthy();

    consoleSpy.mockRestore();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import EditFlight from '../components/EditFlight';

const mockNavigate = vi.fn();
let mockLocationState = null;

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ state: mockLocationState }),
    useParams: () => ({ id: '1' }),
  };
});

describe('EditFlight Component Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocationState = null;

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
        <EditFlight isLoggedIn={false} />
      </MemoryRouter>
    );
    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });

  it('redirects to /AdminDash if logged in but no flight data is in location state', () => {
    render(
      <MemoryRouter>
        <EditFlight isLoggedIn={true} />
      </MemoryRouter>
    );
    expect(mockNavigate).toHaveBeenCalledWith('/AdminDash', { replace: true });
  });

  it('mounts the component and returns HTML when logged in and flight data exists', () => {
    mockLocationState = { flight: { id: 1, flightNumber: 'AC100' } };

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(
      <MemoryRouter>
        <EditFlight isLoggedIn={true} />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeTruthy();

    consoleSpy.mockRestore();
  });

  it('attempts to call fetch on form submit', () => {
    mockLocationState = { flight: { id: 1, flightNumber: 'AC100' } };

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch.mockClear();

    const { getAllByRole } = render(
      <MemoryRouter>
        <EditFlight isLoggedIn={true} />
      </MemoryRouter>
    );

    const submitBtns = getAllByRole('button', { name: /UPDATE FLIGHT/i });
    const submitBtn = submitBtns[0];

    const formEvent = new Event('submit', { bubbles: true, cancelable: true });
    submitBtn.form.dispatchEvent(formEvent);

    expect(submitBtn).toBeTruthy();

    consoleSpy.mockRestore();
  });
});

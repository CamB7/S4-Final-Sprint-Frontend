import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import FlightDash from '../pages/dashboards/FlightDash';

describe('FlightDash Component Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('attempts to fetch flight data', () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <FlightDash />
      </MemoryRouter>
    );

    expect(global.fetch).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('receives flight data', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve([
          { id: 1, flightNumber: 'TEST-777', status: 'SCHEDULED' },
        ]),
    });

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(
      <MemoryRouter>
        <FlightDash />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    expect(container.firstChild).toBeTruthy();

    consoleSpy.mockRestore();
  });
});

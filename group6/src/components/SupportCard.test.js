import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import SupportCard from './SupportCard';

describe('SupportCard', () => {
  afterEach(() => {
    cleanup();
  });

  const supportGroupData = {
    id: 1,
    name: 'Test Support Group',
    phn_no: '123-456-7890',
    rating: 4,
    location: 'Test Location',
    website_url: 'TEMP'
  };

  it('renders support group phone number correctly', () => {
    render(<SupportCard support_groups_data={supportGroupData} />);
    expect(screen.getByText(/123-456-7890/i)).toBeInTheDocument();
  });

  it('renders support group location correctly', () => {
    render(<SupportCard support_groups_data={supportGroupData} />);
    expect(screen.getByText(/Test Location/i)).toBeInTheDocument();
  });

  it('renders "Explore" button correctly', () => {
    render(<SupportCard support_groups_data={supportGroupData} />);
    expect(screen.getByRole('button', { name: /Explore/i })).toBeInTheDocument();
  });
});

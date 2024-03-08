import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import MediaCard from "./MediaCard";

describe('MediaCard', () => {
  afterEach(() => {
    cleanup();
  });

  const mediaData = {
    id: 1,
    title: 'Test Media Title',
    urlToImage: 'test-image-url',
    name: 'Test Media Source',
    publishedAt: new Date().toISOString(),
    description: 'Test media description. This is a long description that needs to be truncated.'
  };

  it('renders media title correctly', () => {
    render(<MediaCard media_data={mediaData} />);
    expect(screen.getByText(/Test Media Title/i)).toBeInTheDocument();
  });

  it('renders media source correctly', () => {
    render(<MediaCard media_data={mediaData} />);
    expect(screen.getByText(/Test Media Source/i)).toBeInTheDocument();
  });

  it('renders "Read More" button correctly', () => {
    render(<MediaCard media_data={mediaData} />);
    expect(screen.getByText(/Read More/i)).toBeInTheDocument();
  });
});

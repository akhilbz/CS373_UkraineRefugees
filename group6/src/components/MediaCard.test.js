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

  it('renders media details correctly', () => {
    render(<MediaCard media_data={mediaData} />);

    expect(screen.getByText(/Test Media Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Media Source/i)).toBeInTheDocument();
    expect(screen.getByText(/Read More/i)).toBeInTheDocument();
  });
});
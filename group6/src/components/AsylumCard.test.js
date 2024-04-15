import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import AsylumCountriesCard from "./AsylumCountriesCard";

describe('AsylumCountriesCard', () => {
  afterEach(() => {
    cleanup(); 
  });

  const countryData = {
    id: 1,
    name: 'Test Country',
    capital: 'Test Capital',
    region: 'Test Region',
    population: 1000000,
    languages: 'Test Language',
    flag: 'test-flag-url'
  };

  it('renders country name correctly', () => {
    render(<AsylumCountriesCard country_data={countryData} />);
    expect(screen.getByText(/Test Country/i)).toBeInTheDocument();
  });

  it('renders country capital correctly', () => {
    render(<AsylumCountriesCard country_data={countryData} />);
    expect(screen.getByText(/Test Capital/i)).toBeInTheDocument();
  });

  it('renders country region correctly', () => {
    render(<AsylumCountriesCard country_data={countryData} />);
    expect(screen.getByText(/Test Region/i)).toBeInTheDocument();
  });

  it('renders country language correctly', () => {
    render(<AsylumCountriesCard country_data={countryData} />);
    expect(screen.getByText(/Test Language/i)).toBeInTheDocument();
  });
});

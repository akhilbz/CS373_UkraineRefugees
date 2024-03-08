import { render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom'
import AsylumCountriesCard from "./AsylumCountriesCard";

describe('AsylumCountriesCard', () => {
    afterEach(() => {
      cleanup(); // Clean up after each test
    });
  
    const countryData = {
      id: 1,
      name: 'Test Country',
      capital: 'Test Capital',
      region: 'Test Region',
      population: 99999,
      languages: 'Test Language',
      flag: 'test-flag-url'
    };
  
    it('renders country details correctly', () => {
      render(<AsylumCountriesCard country_data={countryData} />);
  
      expect(screen.getByText(/Test Country/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Capital/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Region/i)).toBeInTheDocument();
      expect(screen.getByText(/1,000,000/i)).toBeInTheDocument(); // population should be formatted
      expect(screen.getByText(/Test Language/i)).toBeInTheDocument();
    });
  
    it('renders View More button with correct href', () => {
      render(<AsylumCountriesCard country_data={countryData} />);
  
      const viewMoreButton = screen.getByRole('button', { name: /View More/i });
      expect(viewMoreButton).toBeInTheDocument();
  
      expect(viewMoreButton).toHaveAttribute('href', '/asylum-countries/1');
    });
  });
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchPage from './SearchPage';

jest.mock('axios');

describe('SearchPage', () => {
  it('should render the search form', () => {
    render(<SearchPage />);
    expect(screen.getByLabelText('Search Query:')).toBeInTheDocument();
    expect(screen.getByLabelText('Start Year:')).toBeInTheDocument();
    expect(screen.getByLabelText('End Year:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('should update the query state when the search query input changes', () => {
    render(<SearchPage />);
    const queryInput = screen.getByLabelText('Search Query:');
    fireEvent.change(queryInput, { target: { value: 'moon' } });
    expect(queryInput).toHaveValue('moon');
  });

  it('should update the start year state when the start year input changes', () => {
    render(<SearchPage />);
    const startYearInput = screen.getByLabelText('Start Year:');
    fireEvent.change(startYearInput, { target: { value: 2000 } });
    expect(startYearInput).toHaveValue(2000);
  });

  it('should update the end year state when the end year input changes', () => {
    render(<SearchPage />);
    const endYearInput = screen.getByLabelText('End Year:');
    fireEvent.change(endYearInput, { target: { value: 2020 } });
    expect(endYearInput).toHaveValue(2020);
  });

});

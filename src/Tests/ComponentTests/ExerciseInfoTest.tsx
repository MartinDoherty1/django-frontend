/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import { useQuery } from 'react-query';
import '@testing-library/jest-dom';
import ExerciseTypesDisplay from '../../../app/Components/exerciseCategories';

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

describe('ExerciseTypesDisplay', () => {
  it('displays exercise types', () => {
    // Mock the useQuery hook
    (useQuery as jest.Mock).mockReturnValue({
      data: [
        { key: 'Type1', doc_count: 10 },
        { key: 'Type2', doc_count: 20 },
      ],
      error: null,
    });

    // Render the component
    const { getByText } = render(<ExerciseTypesDisplay />);

    // Check that the exercise types are displayed
    expect(getByText('Type1')).toBeInTheDocument();
    expect(getByText('Number of exercises: 10')).toBeInTheDocument();
    expect(getByText('Type2')).toBeInTheDocument();
    expect(getByText('Number of exercises: 20')).toBeInTheDocument();
  });
});
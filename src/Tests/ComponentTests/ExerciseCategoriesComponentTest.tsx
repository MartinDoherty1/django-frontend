/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import { useQuery } from 'react-query';
import '@testing-library/jest-dom';
import ExerciseInfo from '../../../app/Components/exerciseInfo';

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

describe('ExerciseInfo', () => {
  it('displays exercise info', () => {
    // Mock the useQuery hook
    (useQuery as jest.Mock).mockReturnValue({
      data: [
        {
            id: 2,
            exercise_name: "Bicep Curl",
            body_part: "Arm",
            description: "Stronger Arms",
            type: "Dumbbell"
        }
      ],
      error: null,
    });

    // Render the component
    const { getByText } = render(<ExerciseInfo />);

    // Check that the exercise types are displayed
    expect(getByText('Bicep Curl')).toBeInTheDocument();
    expect(getByText('Stronger Arms')).toBeInTheDocument();
    expect(getByText('Arm')).toBeInTheDocument();
  });
});
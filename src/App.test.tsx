import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders learn react link', () => {
  render(<App />);
  const findTheDifferencesAiTest = screen.getByText(/Find the differences AI/i);
  expect(findTheDifferencesAiTest).toBeInTheDocument();
});

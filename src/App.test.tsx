import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders learn react link', () => {
  render(<App />);
  const plAIboxTest = screen.getByText(/plAIbox/i);
  expect(plAIboxTest).toBeInTheDocument();
});

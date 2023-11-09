import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders learn react link', () => {
  render(<App />);
  const aiAssistantTest = screen.getByText(/AI Assistant/i);
  expect(aiAssistantTest).toBeInTheDocument();
});

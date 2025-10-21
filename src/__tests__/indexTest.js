import { render, screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App.jsx';

function getSelectByLabel(label = /category/i) {
  const labelEl = screen.getByText(label).closest('label');
  expect(labelEl).toBeInTheDocument();
  return within(labelEl).getByRole('combobox');
}

test('toggles dark mode on button click', async () => {
  const user = userEvent.setup();
  render(<App />);
  const btn = screen.getByRole('button', { name: /toggle dark mode/i });
  await user.click(btn);
  expect(btn).toHaveTextContent(/toggle light mode/i);
});
 
test('filters products by category (Electronics)', async () => {
  const user = userEvent.setup();
  render(<App />);
  const select = getSelectByLabel();
  await user.selectOptions(select, 'Electronics');
  const cards = document.querySelectorAll('.product-card');
  expect(cards.length).toBeGreaterThan(0);
  cards.forEach(card => {
    expect(within(card).getByText(/electronics/i)).toBeInTheDocument();
  });
});

test('shows empty-state message when no items are rendered', () => {
  render(<App />);
  const select = getSelectByLabel();
  fireEvent.change(select, { target: { value: 'NonExistentCategory' } });
  expect(screen.getByText(/no products in this category/i)).toBeInTheDocument();
});

test('adds items to cart and increments quantity', async () => {
  const user = userEvent.setup();
  render(<App />);
  const addButtons = await screen.findAllByRole('button', { name: /add to cart/i });
  await user.click(addButtons[0]);
  await user.click(addButtons[0]);
  expect(screen.getByText(/2 item\(s\)/i)).toBeInTheDocument();
});
 
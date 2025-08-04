import { render, screen, fireEvent } from '@testing-library/react';
import {TransactionFilterDropdown} from '@/components';
import { FiltersDates } from '@/types';

describe('TransactionFilterDropdown', () => {
  it('debe mostrar opciones al hacer click', () => {
    const handleChange = jest.fn();
    render(<TransactionFilterDropdown selected="All" onChange={handleChange} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Yesterday')).toBeInTheDocument();
    expect(screen.getByText('Last 5 Days')).toBeInTheDocument();
  });

  it('debe llamar a onChange al seleccionar una opción', () => {
    const handleChange = jest.fn();
    render(<TransactionFilterDropdown selected="All" onChange={handleChange} />);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Today'));

    expect(handleChange).toHaveBeenCalledWith('Today');
  });
});

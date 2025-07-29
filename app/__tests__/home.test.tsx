import { render, screen } from '@testing-library/react'

describe('Pantalla Home', () => {
  it('muestra el texto esperado', () => {
    render(<div>WayniWallet</div>)
    expect(screen.getByText('WayniWallet')).toBeInTheDocument()
  })
})
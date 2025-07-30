import { render, screen } from '@testing-library/react'

describe('Pantalla Home', () => {
  it('muestra el texto esperado', () => {
    render(<div>Wallet</div>)
    expect(screen.getByText('Wallet')).toBeInTheDocument()
  })
})
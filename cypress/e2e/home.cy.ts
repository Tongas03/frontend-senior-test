describe('Pantalla principal', () => {
  it('debería mostrar el título de la aplicación', () => {
    cy.visit('/')
    cy.contains('Wallet')
  })
})
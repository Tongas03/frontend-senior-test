describe('Pantalla principal', () => {
  it('debería mostrar el título de la aplicación', () => {
    cy.visit('/')
    cy.contains('WayniWallet') // asumimos que esto aparece en la home
  })
})
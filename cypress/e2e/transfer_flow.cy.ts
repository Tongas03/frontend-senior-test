describe("Transferencia completa con validación de balance", () => {
  let initialBalance: number;

  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Debería mostrar nombre del usuario principal", () => {
    cy.contains("Hola,").should("exist");
  });

  it("Debería capturar el balance inicial dentro de /send/[id]", () => {
    cy.get("a[href^='/send/']").first().click();

    cy.get("[data-testid='user-balance']")
      .should("exist")
      .should("not.have.text", "$")
      .invoke("text")
      .then((text) => {
        const cleaned = text.replace(/[^0-9.-]+/g, "");
        const parsed = parseFloat(cleaned);
        expect(Number.isFinite(parsed)).to.be.true;
        expect(parsed).to.be.greaterThan(0);
        initialBalance = parsed;
      });

    cy.go("back");
  });

  it("Debería permitir completar una transferencia", () => {
    cy.get("a[href^='/send/']").first().click();

    cy.get("input[name='amount']").type("2500");
    cy.get("textarea[name='notes']").type("Pago test e2e");
    cy.contains("Process to Transfer").click();

    cy.contains("Transfer Successful").should("be.visible");
    cy.contains("Back to Home").click();

    cy.url().should("eq", "http://localhost:3000/");
  });

  it("Debería reflejar el nuevo balance al volver a /send/[id]", () => {
    cy.get("a[href^='/send/']").first().click();

    cy.get("[data-testid='user-balance']")
      .should("exist")
      .should("not.have.text", "$")
      .invoke("text")
      .then((text) => {
        const cleaned = text.replace(/[^0-9.-]+/g, "");
        const updatedBalance = parseFloat(cleaned);
        expect(Number.isFinite(updatedBalance)).to.be.true;

        const expectedBalance = initialBalance - 2500;
        expect(Math.round(updatedBalance)).to.equal(Math.round(expectedBalance));
      });
  });
});

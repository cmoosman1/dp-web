describe("Initial Connection", () => {
  it("Connects to localhost:3000", () => {
    cy.visit("http://localhost:3000");
  });
});

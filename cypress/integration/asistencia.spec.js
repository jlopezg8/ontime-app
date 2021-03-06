describe("Register attendance", () => {
  // login just once using API
  let user;
  before(() => {
    cy.fetchEmployer().then((res) => {
      user = res;
    });
  });

  // but set the user before visiting the page
  // so the app thinks it is already authenticated
  beforeEach(() => {
    cy.setUser(user);
    cy.visit("/");
    cy.findByLabelText("Abrir acciones")
      .click()
      .then(() => {
        cy.findByLabelText("Registar asistencia").click();
      });
  });
  describe("detects employee properly and registers attendances", () => {
    beforeEach(() => {
      const valid_employee = "falcao.png";
      cy.pickPhoto(valid_employee);
    });
    it.skip("registers exit attendance", () => {
      cy.findByText(/Falcao/).should("be.visible");
      cy.findByRole("button", { name: /Registrar Entrada/i }).should(
        "be.visible"
      );
      cy.findByRole("button", { name: /Registrar Salida/i })
        .should("be.visible")
        .click();
      cy.findByText(/registrado la salida/).should("be.visible");
    });
    it.skip("registers entrance attendance", () => {
      cy.findByText(/Falcao/).should("be.visible");
      cy.findByRole("button", { name: /Registrar Salida/i }).should(
        "be.visible"
      );
      cy.findByRole("button", { name: /Registrar Entrada/i })
        .should("be.visible")
        .click();
      cy.findByText(/registrado la entrada/).should("be.visible");
    });
  });

  describe("shows error on bad photo", () => {
    it("rejects photos of two or more people", () => {
      const two_employees = "couple.jpg";
      cy.pickPhoto(two_employees);
      cy.findByText(/sólo una, cara/i).should("be.visible");
    });
    it("rejects invalid employee", () => {
      const invalid_employee = "obama.jpg";
      cy.pickPhoto(invalid_employee);
      cy.findByText(/No corresponde a ningún empleado/i).should("be.visible");
    });
  });
});

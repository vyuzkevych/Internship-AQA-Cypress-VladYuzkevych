import { faker } from '@faker-js/faker';

let firstName = faker.person.firstName();
let lastName = faker.person.lastName();
let email = faker.internet.email();
let mobile = faker.string.numeric({length: {min: 10, max: 10}});
let address = faker.location.streetAddress();

describe("cypress home work 1", () => {
  it("Fill and verify Student Registration Form", () => {
    cy.visit("https://demoqa.com/automation-practice-form/");

    // fill the form
    cy.get("#firstName").type(firstName);
    cy.get("#lastName").type(lastName);
    cy.get("#userEmail").type(email);
    cy.get("#gender-radio-1").click({force : true});
    cy.get("#userNumber").type(mobile);
    cy.get("#subjectsContainer").type("maths");
    cy.get(".subjects-auto-complete__menu").click({timeout : 1000});
    cy.get("#hobbies-checkbox-2").check({force : true});
    cy.get("#currentAddress").type(address);
    cy.get("#state").click();
    cy.get("#react-select-3-option-1").click();
    cy.get("#city").click();
    cy.get("#react-select-4-option-1").click();
    cy.get("#submit").click();

    // verify the submitted form
    cy.get("#example-modal-sizes-title-lg")
      .should("have.text", "Thanks for submitting the form");
    cy.get("tbody > tr:nth-child(1) > td:last-child")
      .should("have.text", `${firstName} ${lastName}`);
    cy.get("tbody > tr:nth-child(2) > td:last-child")
      .should("have.text", email);
    cy.get("tbody > tr:nth-child(3) > td:last-child")
      .should("have.text", "Male");
    cy.get("tbody > tr:nth-child(4) > td:last-child")
      .should("have.text", mobile);
    cy.get("tbody > tr:nth-child(5) > td:last-child")
      .should("have.text", "16 August,2024");
    cy.get("tbody > tr:nth-child(6) > td:last-child")
      .should("have.text", "Maths");
    cy.get("tbody > tr:nth-child(7) > td:last-child")
      .should("have.text", "Reading");
    cy.get("tbody > tr:nth-child(9) > td:last-child")
      .should("have.text", address);
    cy.get("tbody > tr:nth-child(10) > td:last-child")
      .should("have.text", "Uttar Pradesh Lucknow");
  })
})

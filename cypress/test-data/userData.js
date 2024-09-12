import { faker } from "@faker-js/faker";

const userData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    username: Cypress.env("userName"),
    password: Cypress.env("password"),
    confirmPassword: Cypress.env("password"),
    gender: "Male"
}

export default userData;
import { faker } from "@faker-js/faker";

const userDataFakeStoreApi = {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: Cypress.env("passwordFakeStore"),
    name:{
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName()
    },
    address:{
        city: faker.location.city(),
        street: faker.location.street(),
        number: 5,
        zipcode: faker.location.zipCode(),
        geolocation:{
            lat: "-37.3159",
            long: "81.1496"
        }
    },
    phone: faker.phone.number()
}

export default userDataFakeStoreApi;
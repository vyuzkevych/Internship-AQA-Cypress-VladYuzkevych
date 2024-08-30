import userData from "../test-data/userData";

// after call to /api/Login directly, on UI user is not logged in
// i tried to do this via postman, swagger it is not working
// so i had to set authToken into local storage
// also becouse of this i creating, logging in and setting token in 'before' hook


describe("cypress home work 3", () => {
    let token;

    // creating user
    before(()=> {
        cy.request({
            method: "POST",
            url: Cypress.env("baseUrl") + "/api/User",
            body: userData
        }).then((response) => {
            expect(response.status).to.eq(200);
        });

        // log in with created user and getting token
        cy.request({
            method: "POST",
            url: Cypress.env("baseUrl") + "/api/Login",
            body: {
                username: userData.username,
                password: userData.password
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.token).not.be.empty;
            token = response.body.token;
            expect(response.body.userDetails.username).to.be.equal(userData.username);

            // setting authToken into local storage
            cy.window().then((win) => {
                win.localStorage.setItem("authToken", token);
            })
        })
    })

    it("Open UI browser and navigate to base url" +
        "Verify that user is logged in with created user from previous step", () => {

        cy.visit(Cypress.env("baseUrl"))

        cy.get(".mdc-button__label > span", { timeout : 10000 })
            .contains(userData.username).should("be.visible");
    });

})
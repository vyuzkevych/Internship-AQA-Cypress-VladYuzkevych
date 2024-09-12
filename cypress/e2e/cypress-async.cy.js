import userDataFakeStoreApi from "../test-data/userDataFakeStoreApi";
import productData from "../test-data/productData";

describe("HW_Cypress_L20. js-async", () => {
    it("Callback hell", function() {
        cy.request("POST", `${Cypress.env("baseUrlFakeStore")}/users`, userDataFakeStoreApi).then((user) => {
            const userId = user.body.id;
            cy.request("GET", `${Cypress.env("baseUrlFakeStore")}/users/${user.body.id}`).then((fetchedUser) => {
                expect(fetchedUser.body).not.to.be.undefined;
                
                cy.request("PUT", `${Cypress.env("baseUrlFakeStore")}/users/${userId}`, {
                    username: "updatedUser"
                }).then((updatedUser) => {
                    expect(updatedUser.body.username).to.be.equal("updatedUser");
                    
                    cy.request("GET", `${Cypress.env("baseUrlFakeStore")}/products`).then((products) => {
                        expect(products.body).to.have.length.greaterThan(1);
                        
                        cy.request("POST", `${Cypress.env("baseUrlFakeStore")}/products`, productData).then((product) => {
                            const productId = product.body.id;
                            expect(product.body).to.contain(productData);
                            
                            cy.request("DELETE", `${Cypress.env("baseUrlFakeStore")}/products/${productId}`).then(() => {
                                cy.request("GET", `${Cypress.env("baseUrlFakeStore")}/products/${productId}`).then((resp) => {
                                    expect(resp.status).to.eq(200);
                                    
                                    cy.request("DELETE", `${Cypress.env("baseUrlFakeStore")}/users/${userId}`).then(() => {
                                        cy.request("GET", `${Cypress.env("baseUrlFakeStore")}/users/${userId}`).then((resp) => {
                                            expect(resp.status).to.eq(200);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});


it("Promises", async function() {
    let userId;
    let productId;

    const createUser = async () => {
        try {
            const createUserResponse = await cy.request("POST", `${Cypress.env("baseUrlFakeStore")}/users`, userDataFakeStoreApi);
            userId = createUserResponse.body.id;
            const getCreatedUser = await cy.request("GET", `${Cypress.env("baseUrlFakeStore")}/users/${userId}`);
            return getCreatedUser;
        } catch (error) {
            cy.log("User is not created: ", error);
            throw error;
        }
    };
    createUser().then((resp) => {
        expect(resp.body).not.to.be.undefined;
    })

    const updateUser = async () => {
        try {
            const updateUserResponse = await cy.request("PUT", `${baseUrl}/users/${userId}`, {
                username: "updatedUser"
            });
            return updateUserResponse;
        } catch (error) {
            cy.log("An error occurred during update: ", error);
            throw error;
        }
    };
    updateUser().then((resp) => {
        expect(resp).to.equal("updatedUser");
    })

    const getList = async () => {
        try {
            const productList = await cy.request("GET", `${baseUrl}/products`);
            return productList;
        } catch (error) {
            cy.log("An error occurred during fetching product list: ", error);
            throw error;
        }
    };
    getList().then((resp) => {
        expect(resp.body).to.have.length.greaterThan(1);
    })

    const createProduct = async () => {
        try {
            const createdProductResponse = await cy.request("POST", `${baseUrl}/products`, productData);
            productId = createdProductResponse.body.id;
            return createdProductResponse;
        } catch (error) {
            cy.log("An error occurred during product creation: ", error);
            throw error;
        }
    };
    createProduct().then((resp) => {
        expect(resp.body).to.include(productData);
    })

    const deleteProduct = async () => {
        try {
            const deleteProductResponse = await cy.request("DELETE", `${baseUrl}/products/${productId}`);
            return deleteProductResponse;
        } catch (error) {
            cy.log("An error occurred during product deletion: ", error);
            throw error;
        }
    };
    deleteProduct().then((resp) => {
        expect(resp.status).to.equal(200);
    })

    const deleteUser = async () => {
        try {
            const deleteUserResponse = await cy.request("DELETE", `${baseUrl}/users/${userId}`);
            return deleteUserResponse;
        } catch (error) {
            cy.log("An error occurred during user deletion: ", error);
            throw error;
        }
    };

    deleteUser().then((resp) => {
        expect(resp.status).to.equal(200);
    })
});
    

it("Async/Await", async function() {
    let userId;
    let productId;

    await cy.request("POST", `${Cypress.env("baseUrlFakeStore")}/users`, userDataFakeStoreApi)
        .then((resp) => {
            userId = resp.body.id;
            expect(resp.status).to.eq(200);
        })
        .then(async () => {
            await cy.request("GET", `${Cypress.env("baseUrlFakeStore")}/users/${userId}`)
            .then((resp) => {
                expect(resp.status).to.eq(200);
                expect(resp).to.not.be.undefined;
            });
        })
        .then(async () => {
            await cy.request("PUT", `${Cypress.env("baseUrlFakeStore")}/users/${userId}`, {
                 username: "updatedUser"
            })
                .then((resp) => {
                    expect(resp.body.username).to.equal("updatedUser");
                });
        })
        .then(async () => {
            await cy.request("GET", `${Cypress.env("baseUrlFakeStore")}/products`)
                .then((resp) => {
                    expect(resp.body).to.have.length.greaterThan(1);
                });
        })
        .then(async () => {
            await cy.request("POST", `${Cypress.env("baseUrlFakeStore")}/products`, productData)
                .then((resp) => {
                    productId = resp.body.id;
                    expect(resp).to.include(productData);
                });
        })
        .then(async () => {
            await cy.request("DELETE", `${Cypress.env("baseUrlFakeStore")}/products/${productId}`)
                .then((resp) => {
                    expect(resp.status).to.equal(200);
                });
        })
        .then(async () => {
            await cy.request("DELETE", `${Cypress.env("baseUrlFakeStore")}/users/${userId}`)
                .then((resp) => {
                    expect(resp.status).to.equal(200);
                });
        });
});



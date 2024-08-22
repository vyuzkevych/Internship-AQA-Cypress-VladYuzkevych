
describe("cypress home work 2 | Automate web table", () => {
    beforeEach(() => {
        cy.visit("https://demoqa.com/webtables");
    })

    it("Create a new user and verify that user was added", () => {
        cy.fixture('userData.json').then((user) => {
            cy.addUser(user);
            cy.get(".rt-td").should("contain.text", user.firstName)
                .and("contain.text", user.lastName)
                .and("contain.text", user.email);
        });
    });
    
    it("Edit user and check that each field is editable", () => {
        cy.get("#edit-record-1").click({ force: true });
        cy.fixture('userData.json').then((user) => {
            cy.get("#firstName").clear().type(user.firstName);
            cy.get('#lastName').clear().type(user.lastName);
            cy.get('#userEmail').clear().type(user.email);
            cy.get('#age').clear().type(user.age);
            cy.get('#salary').clear().type(user.salary);
            cy.get('#department').clear().type(user.department);
            cy.get('#submit').click();

            cy.get(".rt-td").should("contain.text", user.firstName)
                .and("contain.text", user.lastName)
                .and("contain.text", user.email);
        });
    });

    it("Delete user from the table and check that user was deleted", () => {
        cy.get("#delete-record-2").click({ force: true });
        cy.get(".rt-td").should("not.contain.text", "alden@example.com");
    });

    it("Check searching feature", () => {
        cy.get("#searchBox").type("Kierra");
        cy.get(".rt-tr-group").should(($p) => {
            expect($p.first()).to.contain("kierra@example.com");
            expect($p.eq(1)).to.not.contain.text();
        });
    });

    it("Sort table by First Name", () => {
        cy.get(".rt-resizable-header-content").contains("First Name").click();
        cy.wait(500);
        cy.get(".rt-tbody .rt-tr > div:nth-child(1)").then(($vals) => {
            const names = []
            $vals.each((index, $val) => {
                names.push($val.innerText);
            })

            let sorted = [...names].sort();
            expect(names).to.deep.equal(sorted);
        });
    });

    it("Sort table by Last Name", () => {
        cy.get(".rt-resizable-header-content").contains("Last Name").click();
        cy.wait(500);
        cy.get(".rt-tbody .rt-tr > div:nth-child(2)").then(($vals) => {
            const names = []
            $vals.each((index, $val) => {
                names.push($val.innerText);
            })

            let sorted = [...names].sort();
            expect(names).to.deep.equal(sorted);
        });
    });

    it("Sort table by Age", () => {
        cy.get(".rt-resizable-header-content").contains("Age").click();
        cy.wait(500);
        cy.get(".rt-tbody .rt-tr > div:nth-child(3)").then(($vals) => {
            const ages = []
            $vals.each((index, $val) => {
                ages.push($val.innerText);
            })

            let ageWithoutEmtyStrings = ages.filter(str => str.trim() !== "");
            let sorted = [...ageWithoutEmtyStrings].sort((a, b) => a - b);
            expect(ageWithoutEmtyStrings).to.deep.equal(sorted);
        });
    });

    it("Sort table by Email", () => {
        cy.get(".rt-resizable-header-content").contains("Email").click();
        cy.wait(500);
        cy.get(".rt-tbody .rt-tr > div:nth-child(4)").then(($vals) => {
            const emails = []
            $vals.each((index, $val) => {
                emails.push($val.innerText);
            })

            let sorted = [...emails].sort();
            expect(emails).to.deep.equal(sorted);
        });
    });

    it("Sort table by Salary", () => {
        cy.get(".rt-resizable-header-content").contains("Salary").click();
        cy.wait(500);
        cy.get(".rt-tbody .rt-tr > div:nth-child(5)").then(($vals) => {
            const salaries = []
            $vals.each((index, $val) => {
                salaries.push($val.innerText);
            })

            let salariesWithoutEmtyStrings = salaries.filter(str => str.trim() !== "");
            let sorted = [...salariesWithoutEmtyStrings].sort((a, b) => a - b);
            expect(salariesWithoutEmtyStrings).to.deep.equal(sorted);
        });
    });

    it("Sort table by Department", () => {
        cy.get(".rt-resizable-header-content").contains("Department").click();
        cy.wait(500);
        cy.get(".rt-tbody .rt-tr > div:nth-child(6)").then(($vals) => {
            const deps = []
            $vals.each((index, $val) => {
                deps.push($val.innerText);
            })

            let sorted = [...deps].sort();
            expect(deps).to.deep.equal(sorted);
        });
    });
});
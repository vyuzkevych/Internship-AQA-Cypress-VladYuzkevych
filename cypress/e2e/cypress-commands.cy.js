import { mainPage } from "../page-objects/mainPage.js";
import { elementsPage } from "../page-objects/elementsPage.js";
import { WebTablesPage } from "../page-objects/webTablesPage.js";

describe("cypress home work 3 | Automate web table with POM", () => {
    let webTablesPage;

    beforeEach(() => {
        webTablesPage = new WebTablesPage();

        cy.visit(mainPage.data.url);
        mainPage.actions.clickElementsPage();
        elementsPage.actions.clickwebTableBtn();
    })

    it("Create a new user and verify that user was added", () => {
        cy.fixture('userData.json').then((user) => {
            webTablesPage.action.addUser(user)
            webTablesPage.get.tableCell().should("contain.text", user.firstName)
                .and("contain.text", user.lastName)
                .and("contain.text", user.email);
        });
    });
    
    it("Edit user and check that each field is editable", () => {
        webTablesPage.action.clickOnEditBtnFirstRow();
        cy.fixture('userData.json').then((user) => {
            webTablesPage.action.enterFirstName(user.firstName);
            webTablesPage.action.enterLastName(user.lastName);
            webTablesPage.action.enterEmail(user.email);
            webTablesPage.action.enterAge(user.age);
            webTablesPage.action.enterSalary(user.salary);
            webTablesPage.action.enterDepartment(user.department);
            webTablesPage.action.clickOnSubmitBtn();

            webTablesPage.get.tableCell().should("contain.text", user.firstName)
                .and("contain.text", user.lastName)
                .and("contain.text", user.email);
        });
    });

    it("Delete user from the table and check that user was deleted", () => {
        webTablesPage.action.clickOnDeleteBtnSecondRow();
        webTablesPage.get.tableCell().should("not.contain.text", "alden@example.com");
    });

    it("Check searching feature", () => {
        webTablesPage.action.enterValueSearchField("Kierra");
        webTablesPage.get.tableRow().should(($row) => {
            expect($row.first()).to.contain("kierra@example.com");
            expect($row.eq(1)).to.not.contain.text();
        });
    });

    it("Sort table by First Name", () => {
        webTablesPage.action.clickOnTableHeaderFirstName();
        cy.wait(500);
        
        const names = webTablesPage.action.getArrayOfValues(webTablesPage.get.tableFirstNameColumn());
        const sorted = webTablesPage.action.sortStrings(names);

        expect(names).to.deep.equal(sorted);
    });

    it("Sort table by Last Name", () => {
        webTablesPage.action.clickOnTableHeaderLastName();
        cy.wait(500);
        
        const names = webTablesPage.action.getArrayOfValues(webTablesPage.get.tableLastNameColumn());
        const sorted = webTablesPage.action.sortStrings(names);

        expect(names).to.deep.equal(sorted);
    });

    it("Sort table by Age", () => {
        webTablesPage.action.clickOnTableHeaderAge();
        cy.wait(500);
        
        const ages = webTablesPage.action.removeEmptyLines(webTablesPage.get.tableAgeColumn());
        const sorted = webTablesPage.action.sortNumbers(ages);

        expect(ages).to.deep.equal(sorted);
    });

    it("Sort table by Email", () => {
        webTablesPage.action.clickOnTableHeaderEmail();
        cy.wait(500);

        const emails = webTablesPage.action.getArrayOfValues(webTablesPage.get.tableEmailColumn());
        const sorted = webTablesPage.action.sortStrings(emails);

        expect(emails).to.deep.equal(sorted);
    });

    it("Sort table by Salary", () => {
        webTablesPage.action.clickOnTableHeaderSalary();
        cy.wait(500);

        const salaryWithoutEmptyLines = webTablesPage.action.removeEmptyLines(webTablesPage.get.tableSalaryColumn());
        const sorted = webTablesPage.action.sortNumbers(salaryWithoutEmptyLines);

        expect(salaryWithoutEmptyLines).to.deep.equal(sorted);
    });

    it("Sort table by Department", () => {
        webTablesPage.action.clickOnTableHeaderDepartment();
        cy.wait(500);
        
        const deps = webTablesPage.action.getArrayOfValues(webTablesPage.get.tableDepartmentColumn());
        const sorted = webTablesPage.action.sortStrings(deps);

        expect(deps).to.deep.equal(sorted);
    });
});
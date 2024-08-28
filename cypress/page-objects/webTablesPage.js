
export class WebTablesPage {

    get = {
        tableCell: () => cy.get(".rt-td"),
        tableRow: () => cy.get(".rt-tr-group"),
        tableHeaderFirstName: () => cy.get(".rt-resizable-header-content").contains("First Name"),
        tableHeaderLastName: () => cy.get(".rt-resizable-header-content").contains("Last Name"),
        tableHeaderAge: () => cy.get(".rt-resizable-header-content").contains("Age"),
        tableHeaderEmail: () => cy.get(".rt-resizable-header-content").contains("Email"),
        tableHeaderSalary: () => cy.get(".rt-resizable-header-content").contains("Salary"),
        tableHeaderDepartment: () => cy.get(".rt-resizable-header-content").contains("Department"),
        editBtnFirstRow: () => cy.get("#edit-record-1"),
        deleteBtnSecondRow: () => cy.get("#delete-record-2"),
        searchField: () => cy.get("#searchBox"),
        tableFirstNameColumn: () => cy.get(".rt-tbody .rt-tr > div:nth-child(1)"),
        tableLastNameColumn: () => cy.get(".rt-tbody .rt-tr > div:nth-child(2)"),
        tableAgeColumn: () => cy.get(".rt-tbody .rt-tr > div:nth-child(3)"),
        tableEmailColumn: () => cy.get(".rt-tbody .rt-tr > div:nth-child(4)"),
        tableSalaryColumn: () => cy.get(".rt-tbody .rt-tr > div:nth-child(5)"),
        tableDepartmentColumn: () => cy.get(".rt-tbody .rt-tr > div:nth-child(6)"),
        regFormFirstName: () => cy.get("#firstName"),
        regFormLastName: () => cy.get('#lastName'),
        regFormEmail: () => cy.get('#userEmail'),
        regFormAge: () => cy.get('#age'),
        regFromSalary: () => cy.get('#salary'),
        regFormDepartment: () => cy.get('#department'),
        regFormSubmitBtn: () => cy.get('#submit') 
    }

    action = {
        addUser: (user) => cy.addUser(user),
        clickOnEditBtnFirstRow: () => this.get.editBtnFirstRow().click({ force : true }),
        clickOnDeleteBtnSecondRow: () => this.get.deleteBtnSecondRow().click({ force : true}),
        enterValueSearchField: (val) => this.get.searchField().type(val),
        clickOnTableHeaderFirstName: () => this.get.tableHeaderFirstName().click(),
        clickOnTableHeaderLastName: () => this.get.tableHeaderLastName().click(),
        clickOnTableHeaderAge: () => this.get.tableHeaderAge().click(),
        clickOnTableHeaderEmail: () => this.get.tableHeaderEmail().click(),
        clickOnTableHeaderSalary: () => this.get.tableHeaderSalary().click(),
        clickOnTableHeaderDepartment: () => this.get.tableHeaderDepartment().click(),
        enterFirstName: (name) => this.get.regFormFirstName().clear().type(name),
        enterLastName: (name) => this.get.regFormLastName().clear().type(name),
        enterAge: (age) => this.get.regFormAge().clear().type(age),
        enterEmail: (email) => this.get.regFormEmail().clear().type(email),
        enterSalary: (salary) => this.get.regFromSalary().clear().type(salary),
        enterDepartment: (dep) => this.get.regFormDepartment().clear().type(dep),
        clickOnSubmitBtn: () => this.get.regFormSubmitBtn().click(),
        removeEmptyLines: (el) => {
            let val = [];
            el.then(($vals) => {
                $vals.each((index, $val) => {
                    val.push($val.innerText);
                })
            })

            const valWithoutEmptyLines = val.filter(str => str.trim() !== "");
            return valWithoutEmptyLines;
        },
        sortNumbers: (arr) => {
            const sorted = [...arr].sort((a, b) => a - b);
            return sorted;
        },
        sortStrings: (arr) => {
            const sorted = [...arr].sort();
            return sorted;
        },
        getArrayOfValues: (el) => {
            let val = [];
            el.then(($vals) => {
                $vals.each((index, $val) => {
                    val.push($val.innerText);
                })
            })

            return val;
        }
    }
}

class ElementsPage {

    get = {
        webTableBtn: () => cy.get(".text").contains("Web Tables")
    }

    actions = {
        clickwebTableBtn: () => this.get.webTableBtn().click()
    }
    
}

export const elementsPage = new ElementsPage();
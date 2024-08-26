
export class MainPage {

    data = {
        url: "https://demoqa.com/"
    }

    get = {
        elementsPage: () => cy.get(".card-body").contains("Elements")
    }

    actions = {
        clickElementsPage: () => this.get.elementsPage().click()
    }
    
}
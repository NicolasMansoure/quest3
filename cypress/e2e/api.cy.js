describe("Test d'api", () => {
    it('Covid-19 API tests : General Stats', () => {
        cy.visit('http://localhost:8080/app')
        cy.request('users/1.json') //  URL is  http://localhost:8080/users/1.json
    })

})
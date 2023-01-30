/// <reference types="cypress" />

describe("Suite de tests sur une route similaire avec tous les paramètres", function() {
    it("Lance une requête GET avec tous les paramètres nécessaires et recoit une réponse correspondant à ces paramètres", function() {
        cy.fixture("data").then((requestData) => {
            let { band, type, info, limit } = requestData.filter(
                (item) => item.key === "allParams"
            )[0];

            cy.apiRequest(band, type, info, limit).then((response) => {
                expect(response.status).to.be.eq(200);
                expect(response.body).to.have.property("Similar");
                expect(response.body.Similar.Info[0].Name.toLowerCase()).to.be.eq(
                    band.toLowerCase()
                );
                expect(response.body.Similar.Results.length).to.be.eq(5);
            });
        });
    });
});

describe("Suite de tests sur une route similaire sans aucun paramètre", function() {
    it("Lance une requête avec des paramètres manquants et recoit une réponse de Body sans propriétés d'information et de résultat", function() {
        cy.fixture("data.json").then((requestData) => {
            let { band, type, info, limit } = requestData.filter(
                (item) => item.key === "emptyParams"
            )[0];

            cy.apiRequest(band, type, info, limit).then((response) => {
                expect(response.status).to.be.eq(200);
                expect(response.body).to.have.property("Similar");
                expect(response.body.Similar.Info.length).to.be.eq(2);
                expect(response.body.Similar.Info[0].Name).to.be.eq("");
                expect(response.body.Similar.Info[1].Name).to.be.eq("");
                expect(response.body.Similar.Results.length).to.be.eq(0);
            });
        });
    });
});
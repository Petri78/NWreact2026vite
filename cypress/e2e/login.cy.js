describe('Kirjautumisjärjestelmä', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('Pitäisi näyttää virheilmoitus väärillä tunnuksilla', () => {
    cy.get('input[placeholder="Käyttäjätunnus"]').type('huijari')
    cy.get('input[placeholder="Salasana"]').type('vaaraSalasana')
    cy.get('button[type="submit"]').click()

    // Varmistetaan, että backend palautti 401 ja frontti näyttää virheen.
    cy.contains('Virheellinen käyttäjätunnus tai salasana').should('be.visible')
  })

  it('Pitäisi kirjautua sisään onnistuneesti oikeilla tunnuksilla', () => {
    cy.get('input[placeholder="Käyttäjätunnus"]').type('petri.pasanen@hotmail.com')
    cy.get('input[placeholder="Salasana"]').type('Petri123')
    cy.get('button[type="submit"]').click()

    // Varmistetaan, että ollaan päästy sisään ja tervetuloa näkyy.
    cy.url().should('include', '/') 
    cy.contains('Tervetuloa').should('be.visible')
  })
})
describe('Pokedex Test', () => {
    it('Loads the homepage', () => {
        cy.visit('/')
    })

    it('Loads search results for a valid query', () => {
        cy.visit('/')
        cy.get('input').type('lapras')
        cy.wait(1000)
        cy.get('div ul li a').first().click()
    })

    it('Pokemon page contains all valid info', () => {
        cy.contains("PokéDex Number").parent().find('td').last().should('have.text', "131")
        cy.contains("Height").parent().find('td').last().should('have.text', "25")
        cy.contains("Weight").parent().find('td').last().should('have.text', "2200")
        cy.contains("Types").parent().find('td').last().should('have.text', "water, ice")
        cy.contains("Held items").parent().find('td').last().should('have.text', "mystic-water")
        cy.contains("Percentage Stats").should('be.visible')
        cy.contains("Evolution Chain").should('be.visible')
    })

    it('Shows an error for an invalid search term', () => {
        cy.visit('/')
        cy.get('input').type('$')
        cy.contains('Invalid search term').should('be.visible') 
    })
    
    it('Shows an error for an invalid search term', () => {
        cy.visit('/')
        cy.get('input').type('thiswillnotreturnresults')
        cy.wait(1000)
        cy.get('div ul li a').should('not.exist')
        cy.contains('Pokémon not found').should('be.visible') 
    })

})
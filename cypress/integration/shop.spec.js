describe('Shop', function () {
	beforeEach(() => {
		cy.fixture('customer-data.json').as('customer');
	});

	it('should select yellow iPhone 11', function() {
		cy.on('uncaught:exception', (error, runnable) => {
			expect(error.message).to.include('Synchronous XHR in page dismissal')
		
			// return false to prevent the error from
			// failing this test
			return false;
		});

		cy.visit('https://www.vodafone.nl/');
	
		// Accept cookies
		cy.contains("Accepteren").click();
	
		cy.contains("Telefoons").click();
		cy.get('[data-testid="vf-product--color-selector--apple-iphone-11-64gb-yellow"]').click();
		cy.get('#apple-iphone-11-64gb-yellow').click();
	})

	it.only('checkout with yellow iPhone 11', function () {
		cy.on('uncaught:exception', (error, runnable) => {
			expect(error.message).to.include('Synchronous XHR in page dismissal')
		
			// return false to prevent the error from
			// failing this test
			return false;
		});

		cy.visit('https://www.vodafone.nl/shop/mobiel/pakket/apple-iphone-11-64gb-yellow');

		// Close cookiewall
		cy.contains('Accepteren').click();

		cy.contains('Volgende stap').click({force: true});

		// Select new contract
		cy.get('.popup-content').contains('Ik wil een nieuw abonnement').click({force: true});
		// cy.contains('Ik wil een nieuw abonnement').click();

		cy.contains('Volgende stap').click({force: true});

		// Enter in customer details
		cy.get('[for="gender-FEMALE"]').click();
		cy.get('#gegevens-initials').type(this.customer.initials);
		cy.get('#gegevens-lastName').type(this.customer.lastName);
		cy.get('#gegevens-birthdate-day').type(this.customer.birthDate);
		cy.get('#gegevens-birthdate-month').type(this.customer.birthMonth);
		cy.get('#gegevens-birthdate-year').type(this.customer.birthYear);

		cy.get('[data-testid="next-form-step-gegevens"]').submit();
		
		// Enter contact details
		cy.get('#contact-phone1').type(this.customer.mobileNumber);
		cy.get('#contact-email').type(this.customer.email);

		cy.get('[data-testid="next-form-step-contact"]').submit();

		// Enter address details
		cy.get('#adres-billingAddress\\.postcode').type(this.customer.postcode);
		cy.get('#adres-billingAddress\\.houseNumber').type(this.customer.houseNumber);
		// Wait for address validation check
		cy.wait(2000);

		cy.get('[data-testid="next-form-step-address"]').submit();

		// Enter identification details
		cy.get('#type').select(this.customer.documentType);
		cy.get('#legitimatie-documentNumber').type(this.customer.documentNumber);
		cy.get('#legitimatie-expiryDate-day').type(this.customer.documentExpirationDay);
		cy.get('#legitimatie-expiryDate-month').type(this.customer.documentExpirationMonth);
		cy.get('#legitimatie-expiryDate-year').type(this.customer.documentExpirationYear);

		cy.get('[name="identificatie"] form').submit();
	});
})
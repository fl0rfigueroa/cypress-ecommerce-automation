/*
  ecommerce.cy.js
  Pruebas E2E para el flujo principal de compra en www.saucedemo.com
*/


function generarPostalRandom() {
    // Genera un código postal aleatorio de 5 dígitos
    return Math.floor(10000 + Math.random() * 90000).toString();
}

describe('Flujo de Compra en E-commerce - SauceDemo', () => {

    // Antes de cada prueba (it), visitamos el sitio e iniciamos sesión
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
        
        // Error común: El login a veces falla.
        // Aseguramos que los campos estén visibles antes de escribir.
        cy.get('[data-test="username"]').should('be.visible').type('standard_user');
        cy.get('[data-test="password"]').should('be.visible').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();

        // Verificamos que entramos a la página de productos
        cy.url().should('include', '/inventory.html');
    });

    it('1. Login y verificación de productos', () => {
        cy.log('TEST 1: Login exitoso y verificación de UI');
        
        // Verificar que el título "Products" (Productos) esté visible
        cy.get('.title').should('contain', 'Products');
        
        // Verificar que existan items para comprar (ej: al menos 6)
        cy.get('.inventory_item').should('have.length.at.least', 6);
    });

    it('2. Añadir producto al carrito', () => {
        cy.log('TEST 2: Añadir un producto y verificar el carrito');

        // Añadir el primer producto (Sauce Labs Backpack)
        // Usamos [data-test] porque es un selector robusto
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // Verificar que el ícono del carrito muestre "1"
        cy.get('.shopping_cart_badge').should('contain', '1');

        // Verificar que el botón ahora diga "Remove"
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible');
    });

    it('3. Flujo completo: Añadir producto, ir al checkout y finalizar compra', () => {
        cy.log('TEST 3: Flujo completo de compra (Checkout)');

        // 1. Añadir producto (Backpack)
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('.shopping_cart_badge').should('contain', '1');

        // 2. Ir al carrito
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');

        // 3. Verificar que el producto esté en el carrito
        cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack');

        // 4. Ir al Checkout
        cy.get('[data-test="checkout"]').click();
        cy.url().should('include', '/checkout-step-one.html');


        const postalCodeRandom = generarPostalRandom();
        cy.log(postalCodeRandom)
        // 5. Llenar formulario de checkout
        cy.get('[data-test="firstName"]').type('Juan');
        cy.get('[data-test="lastName"]').type('Perez');
        cy.get('[data-test="postalCode"]').type('12345');
        cy.get('[data-test="continue"]').click();

        // 6. Revisar orden y finalizar
        cy.url().should('include', '/checkout-step-two.html');
        cy.get('.summary_total_label').should('be.visible'); // Verificar total
        cy.get('[data-test="finish"]').click();

        // 7. Confirmación de orden
        cy.url().should('include', '/checkout-complete.html');
        cy.get('.complete-header').should('contain', 'Thank you for your order!');
    });

});

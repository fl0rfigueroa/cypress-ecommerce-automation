# Proyecto de Automatización de Pruebas QA (Cypress) - E-commerce

Este repositorio contiene un conjunto de pruebas E2E (End-to-End) automatizadas para el sitio de demostración [SauceDemo](https://www.saucedemo.com/), utilizando Cypress.

El objetivo de este proyecto es demostrar habilidades en la automatización de flujos críticos de un E-commerce, como el login, la navegación, la gestión del carrito y el proceso de checkout.

[Haz clic aquí para ver un video de la demostración](demo.mp4)
---

## 🚀 Tecnologías Utilizadas

* **Framework de Pruebas:** [Cypress](https://www.cypress.io/)
* **Lenguaje:** JavaScript (ES6+)
* **Gestor de Paquetes:** NPM
* **Sitio de Pruebas (SUT):** `https://www.saucedemo.com`

---

## 🧪 Casos de Prueba Automatizados

Este proyecto cubre los siguientes escenarios del flujo principal de compra:

1.  **Login y Verificación de UI:**
    * Ingresa con un usuario estándar.
    * Verifica que el login sea exitoso.
    * Comprueba que la página de productos se cargue correctamente y muestre los artículos.

2.  **Añadir Producto al Carrito:**
    * Inicia sesión.
    * Selecciona el producto "Sauce Labs Backpack" y lo añade al carrito.
    * Verifica que el contador del carrito se actualice a "1".
    * Verifica que el botón del producto cambie a "Remove".

3.  **Flujo Completo de Checkout (Compra):**
    * Inicia sesión y añade un producto al carrito.
    * Navega a la página del carrito.
    * Procede al checkout.
    * Rellena el formulario de información del cliente (Nombre, Apellido, C.P.).
    * Confirma la orden en la página de resumen.
    * Verifica el mensaje final de "Thank you for your order!".

declare module "quill/dist/quill.core.css";
declare namespace Cypress {
  interface Chainable<Subject = any> {
    getInputElement(typeSelector: string): Chainable<any>;
    getDataCy(dataCySelector: string): Chainable<any>;
  }
}

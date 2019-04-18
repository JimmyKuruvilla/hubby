const __registry = '__registry';

export class Registry {
  static init() {
    if (!window.__registry) {
      window.__registry = new Map();
    }
    return window.__registry;
  }

  static set(objSymbol, objRef) {
    window.__registry.set(objSymbol, objRef);
  }

  static get(classSymbol) {
    return window.__registry.get(classSymbol);
  }

}
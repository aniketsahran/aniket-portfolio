import '@testing-library/jest-dom'

// jsdom does not implement matchMedia; provide a minimal stub so components
// that read prefers-reduced-motion can render in tests.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })
}

// jsdom does not implement IntersectionObserver, which framer-motion's
// whileInView relies on. Provide a no-op stub so motion components mount.
if (!window.IntersectionObserver) {
  class IntersectionObserverStub {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
  window.IntersectionObserver = IntersectionObserverStub
  globalThis.IntersectionObserver = IntersectionObserverStub
}

// jsdom does not implement ResizeObserver, which Lenis (smooth scroll) uses.
if (!window.ResizeObserver) {
  class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = ResizeObserverStub
  globalThis.ResizeObserver = ResizeObserverStub
}

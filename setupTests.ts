/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from "vitest";

class MockElementInternals {
  shadowRoot: ShadowRoot | null;
  form: HTMLFormElement | null;
  states: Set<string>;
  formValue?: unknown;

  constructor(element: HTMLButtonElement) {
    this.shadowRoot = element.shadowRoot || null;
    this.form = null;
    this.states = new Set();
  }
  setFormValue(value: unknown) {
    this.formValue = value;
  }
}

(Element.prototype as any).attachInternals = function (): MockElementInternals {
  return new MockElementInternals(this);
};

HTMLDialogElement.prototype.show = vi.fn(function mock(
  this: HTMLDialogElement
) {
  this.open = true;
});

HTMLDialogElement.prototype.showModal = vi.fn(function mock(
  this: HTMLDialogElement
) {
  this.open = true;
});

HTMLDialogElement.prototype.close = vi.fn(function mock(
  this: HTMLDialogElement
) {
  this.open = false;
});

export function $<T>(selector: string) {
  return document.querySelector(selector) as T | null;
}

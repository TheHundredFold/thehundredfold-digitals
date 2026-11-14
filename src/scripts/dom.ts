export function element<T extends HTMLElement = HTMLElement>(id: string): T {
  const target = document.getElementById(id) ?? document.querySelector('.' + id);
  if (!(target instanceof HTMLElement)) throw new Error('Required interface element missing: ' + id);
  return target as T;
}

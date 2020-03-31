import _slugify from 'slugify';

export function slugify(input: string): string {
  return _slugify(input).toLowerCase();
}

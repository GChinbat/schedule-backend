import _slugify from 'slugify';
import { TokenData } from './models/users';

export function slugify(input: string): string {
  return _slugify(input).toLowerCase();
}

export function checkEnv(key: string) {
  if (!process.env[key]) {
    throw Error(
      `Could not find ${key} environment variable. Did you set it in .env file?`,
    );
  }
}

export const requireAdmin = (fn) => (
  root: any,
  params: any,
  ctx: TokenData | null,
) => {
  if (!ctx?.admin) throw Error('Forbidden');
  return fn(root, params, ctx);
};

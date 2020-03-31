import _slugify from 'slugify';

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

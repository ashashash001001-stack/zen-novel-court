const base = import.meta.env.BASE_URL || '/';
const site = import.meta.env.SITE_URL || 'https://ashashash001001-stack.github.io';

function cleanJoin(a: string, b: string): string {
  if (a === '/') return b.startsWith('/') ? b : '/' + b;
  const av = a.endsWith('/') ? a.slice(0, -1) : a;
  const bv = b.startsWith('/') ? b.slice(1) : b;
  return av + '/' + bv;
}

export const config = {
  base,
  site,
  path: (p: string) => cleanJoin(base, p)
};
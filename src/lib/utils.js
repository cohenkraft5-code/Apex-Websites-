// Lightweight classnames merge (no clsx/tailwind-merge dependency needed)
export function cn(...inputs) {
  return inputs.flat(Infinity).filter(Boolean).join(' ')
}

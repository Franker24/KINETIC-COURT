export interface NavItem {
  label: string;
  target: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'ROSTER', target: 'roster' },
  { label: 'GEAR', target: 'gear' },
  { label: 'LABS', target: 'labs' },
  { label: 'STORE', target: 'store' },
];

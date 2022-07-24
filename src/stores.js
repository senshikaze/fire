import {writable} from 'svelte/store';

export const fi_target = writable(0);
export const total_assets = writable(0);

export const target_year = writable(0);
export const monthly_savings = writable(0);
export const apr = writable(8);
export const inflation = writable(2);

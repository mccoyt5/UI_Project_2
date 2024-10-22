import { writable } from "svelte/store";

export const lightData = writable([1000, 1100, 800, 750, 900, 1000, 1000]);
export const kData = writable([20000, 18000, 18500, 20000, 21000, 20000, 21000]);
export const naData = writable([40, 30, 25, 40, 45, 20, 30]);
export const waterData = writable([60, 85, 70, 45, 80, 60, 60]);

export const absoluteMin = writable(0);
export const absoluteMax = writable(10000);
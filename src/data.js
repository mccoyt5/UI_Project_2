import { writable } from "svelte/store";

export const nutrientData = writable([123, 456, 321, 654, 221, 542, 503]);
export const waterData = writable([321, 123, 456, 654, 221, 333, 482]);

/* =================================================================
*
*   LIGHT STUFF
*
* ==================================================================*/
export const lightData = writable([1000, 1100, 800, 750, 900, 1000, 1000]);

export const lightAbsoluteMin = writable(0);
export const lightAbsoluteMax = writable(10000);
export const plantDesiredLight = writable(1000);
// @ts-ignore
export const minPlantLight = writable();
// @ts-ignore
export const maxPlantLight = writable();
// export const lightAcceptableMin = writable(900)
// export const lightAcceptableMax = writable(1100)
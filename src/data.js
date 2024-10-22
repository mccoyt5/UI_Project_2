import { writable } from "svelte/store";

export const nutrientData = writable([123, 456, 321, 654, 221, 542, 503]);
export const waterData = writable([60, 85, 70, 45, 80, 60, 60]);

/* =================================================================
*
*   LIGHT STUFF
*
* ==================================================================*/
export const lightData = writable([1000, 1100, 800, 750, 900, 1000, 1000]);

export const lightAbsoluteMin = writable(0);
export const lightAbsoluteMax = writable(10000);
export const plantDesiredLight = writable(1000);

/* =================================================================
*
*   WATER STUFF
*
* ==================================================================*/

export const maxWaterLevel = writable(90); // Max water level in percentage
export const neededWaterLevel = writable(70); // Needed water level in percentage
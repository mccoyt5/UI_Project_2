import { writable } from "svelte/store";

export const lightLevel = writable(1000);

export const randomLightLevel = () => lightLevel.set(Math.floor(Math.random() * (10000 - 1) + 1));

export const brighterRoom = () => 
{ 
    lightLevel.update(n => n + 100);
};

export const dimmerRoom = () => 
{ 
    lightLevel.update(n => n - 100);
};
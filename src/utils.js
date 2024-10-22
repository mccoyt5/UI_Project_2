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

export const waterLevel = writable(40);

export const addWater = () => 
{ 
    waterLevel.update(n => n + 1);
};

export const removeWater = () => 
{ 
    waterLevel.update(n => n - 1);
};

export const kLevel = writable(20000);

export const naLevel = writable(40);

export const increaseK = () => 
{ 
    kLevel.update(n => n + 1000);
};
    
export const increaseNa = () => 
{ 
    naLevel.update(n => n + 1);
};

export const decreaseK = () => 
{ 
    kLevel.update(n => n - 1000);
};
        
export const decreaseNa = () => 
{ 
    naLevel.update(n => n - 1);
};
<script>
  import { Link } from 'svelte-routing';
  import { lightData } from '../data';
  import { lightLevel } from '../utils';
  import { absoluteMin, absoluteMax } from '../data';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing'; 
  
  let plantDesiredLight = 1000;
  let changeDesiredLight = false;
  let changeDesiredLightButtonLabel = "Change Desired Light Level";

  // Reactive min and max values based on the desired plant light
  $: minPlantLight = Math.round(plantDesiredLight * 0.9);
  $: maxPlantLight = Math.round(plantDesiredLight * 1.1);
  // Create a tweened store to animate the light level's X position
  const lightXPosition = tweened(0, { duration: 800, easing: cubicOut });

  // Calculate the extended range for the light level
  $: lowerBound = minPlantLight - (maxPlantLight - minPlantLight);  // Extended lower bound
  $: upperBound = maxPlantLight + (maxPlantLight - minPlantLight);  // Extended upper bound

  // Reactive statement to update the X position based on the light level, clamping the value within the new range
  $: {
    // Mapping the light level to the 0-500 range based on the extended bounds
    let position = 500 * (($lightLevel - lowerBound) / (upperBound - lowerBound));

    // Clamp the position to stay within the SVG bounds (0 to 500)
    position = Math.min(500, Math.max(0, position));

    lightXPosition.set(position); // Update tweened position
  }
  

  function updateDesiredLight() {
    changeDesiredLight = !changeDesiredLight;
    if (changeDesiredLight == true) {
      changeDesiredLightButtonLabel = "Set New Desired Light Level";
    }
    else {
      changeDesiredLightButtonLabel = "Change Desired Light Level";
      minPlantLight = Math.round(plantDesiredLight * 0.9);
      maxPlantLight = Math.round(plantDesiredLight * 1.1);
    }
  }
</script>

<div>
  <h1>Light level</h1>

  <div>


    <div id="lightLevel">
      <button id="update" on:click={updateDesiredLight}>
        {changeDesiredLightButtonLabel}
      </button>
      {#if changeDesiredLight == false}
        <p>Desired light level: {plantDesiredLight} lux</p>
      {:else}
        <p>Desired light level:  <input type="number" min={$absoluteMin} max={$absoluteMax} bind:value={plantDesiredLight} /> lux</p>
      {/if}

    </div>

    <br />

    <!-- SVG Graphic -->
    <svg width="500" height="150" viewBox="0 -30 500 150" xmlns="http://www.w3.org/2000/svg">
      <!-- Black stroke and rounded corners around the three colored rectangles -->
      <rect x="3" y="0" width="494px" height="30" fill="none" stroke="black" stroke-width="5" rx="10" ry="10" />
    
      <!-- Grouping the colored rectangles -->
      <g>
        <!-- Red rectangle on the left -->
        <rect x="3" width="187" height="30" fill="#ff7a7a" stroke-width="1" rx="10" ry="10" />
        
        <!-- Red rectangle on the right -->
        <rect width="163" height="30" fill="#ff7a7a" stroke-width="1" x="334" rx="10" ry="10" />
    
        <!-- Green rectangle, slightly larger and overlapping the red ones -->
        <rect width="176" height="30" fill="#7aff8a" stroke-width="1" x="167"  />
      </g>
    
      <!-- Text for ranges -->
      <text x="55" y="20">&lt {minPlantLight}</text>
      <text x="215" y="20">{minPlantLight} - {maxPlantLight}</text>
      <text x="385" y="20">&gt {maxPlantLight}</text>
    
      <!-- Vertical line indicating the current light level -->
      <line x1={$lightXPosition} y1="-10" x2={$lightXPosition} y2="40" stroke="black" stroke-width="3" />
    
      <!-- Text showing the current value right above the vertical line -->
      <text x={$lightXPosition} y="-15" fill="black" text-anchor="middle" font-weight="bold">
        {#if $lightLevel > upperBound}
          <tspan dx="-75">Light level too high!</tspan>
        {:else if $lightLevel < lowerBound}
          <tspan dx="75">Light level too low!</tspan>
        {:else}
          {$lightLevel} lux
        {/if}
      </text>
    </svg>

    <!-- Display Current and Desired Light Level Side by Side -->
    <div class="light-levels">
      <span><strong>Current light level:</strong> {$lightLevel} lux | </span>
      <span><strong>Desired light level:</strong> {plantDesiredLight} lux</span>
    </div>
  </div>
</div>

<style>
  svg {
    margin: 5px 0;
  }

  /* Flexbox to align current and desired light level side by side */
  .light-levels {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    font-size: 1.2em;
  }

  .light-levels span {
    font-weight: bold;
  }
</style>

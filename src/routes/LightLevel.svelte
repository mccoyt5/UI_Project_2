<script>
  import { Link } from 'svelte-routing';
  import { lightData } from '../data';
  import { lightLevel } from '../utils';
  import { absoluteMin, absoluteMax } from '../data';

  let plantDesiredLight = 1000;
  let minPlantLight = Math.round(plantDesiredLight * 0.9);
  let maxPlantLight = Math.round(plantDesiredLight * 1.1);
  let changeDesiredLight = false;
  let changeDesiredLightButtonLabel = "Change Desired Light Level";

  $: if (plantDesiredLight < $absoluteMin) plantDesiredLight = $absoluteMin;
  $: if (plantDesiredLight > $absoluteMax) plantDesiredLight = $absoluteMax;
  $: if (typeof plantDesiredLight != "number") plantDesiredLight = $absoluteMin;
  $: if ($lightLevel < $absoluteMin) $lightLevel = $absoluteMin;
  $: if ($lightLevel > $absoluteMax) $lightLevel = $absoluteMax;

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
    <p>Current light level: {$lightLevel} lux</p>

    <div id="lightLevel">
      {#if changeDesiredLight == false}
        <p>Desired light level: {plantDesiredLight} lux</p>
      {:else}
        <label>Desired light level:
          <input type="number" min={$absoluteMin} max={$absoluteMax} bind:value={plantDesiredLight} />
          lux
        </label>
        <p></p>
      {/if}
      <button id="update" on:click={updateDesiredLight}>
        {changeDesiredLightButtonLabel}
      </button>
    </div>

    <br />

    <svg width="500" height="90">
      <rect width="167" height="10" fill="red" stroke-width="1" />
      <rect width="167" height="10" fill="green" stroke-width="1" x="167" />
      <rect width="167" height="10" fill="red" stroke-width="1" x="334" />
      <text x="55" y="30">&lt {minPlantLight}</text>
      <text x="215" y="30">{minPlantLight} - {maxPlantLight}</text>
      <text x="385" y="30">&gt {maxPlantLight}</text>

      {#if $lightLevel < minPlantLight}
        <circle cx="83.5" cy="50" r="10" fill="red" />
        <circle cx="250" cy="50" r="10" />
        <circle cx="417.5" cy="50" r="10" />
      {:else if $lightLevel > maxPlantLight}
        <circle cx="83.5" cy="50" r="10" />
        <circle cx="250" cy="50" r="10" />
        <circle cx="417.5" cy="50" r="10" fill="red" />
      {:else}
        <circle cx="83.5" cy="50" r="10" />
        <circle cx="250" cy="50" r="10" fill="red" />
        <circle cx="417.5" cy="50" r="10" />
      {/if}
    </svg>
  </div>

  <div>
    
  </div>
</div>

<style>
  button {
    padding: 10px;
    margin: 5px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

  svg {
    margin: 10px 0;
  }
</style>

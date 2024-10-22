<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import PlantIcon from "../components/PlantIcon.svelte";
  import { Link } from "svelte-routing";
  import { lightLevel, waterLevel } from "../utils";
  import { maxWaterLevel, plantDesiredLight } from "../data";

  let lightPercentage = 50;
  lightLevel.subscribe((val) => {
    lightPercentage = (val / $plantDesiredLight) * 100;
  });
  plantDesiredLight.subscribe((val) => {
    lightPercentage = ($lightLevel / val) * 100;
  });

  let waterPercentage = 50;
  waterLevel.subscribe((val) => {
    waterPercentage = (val / $maxWaterLevel) * 100;
  });

  let plantData;

  $: plantData = {
    light: lightPercentage,
    water: waterPercentage,
    nutrients: 50,
    lastUpdated: new Date(),
  };

  $: lightStatus = getStatus(plantData.light);
  $: waterStatus = getStatus(plantData.water);
  $: nutrientStatus = getStatus(plantData.nutrients);

  function getStatus(value) {
    if (value < 30) return "critical";
    if (value < 60) return "warning";
    return "optimal";
  }

  onMount(() => {
    // Fetch real data here
  });
</script>

<div class="aggregate-details-container">
  <PlantIcon status={waterStatus} />
  <h2>Plant Health Overview</h2>

  <Link id ="lightData" to="/light-data">
    <div class="section {lightStatus} light">
      <h3>Light</h3>
      <progress value={plantData.light} max="100"></progress>
      {#if lightStatus !== "optimal"}
        <span class="alert">⚠️</span>
      {/if}
    </div>
  </Link>

  <Link to="/water-data">
  <div class="section {waterStatus} water">
    <h3>Water</h3>
    <progress value={plantData.water} max="100"></progress>
    {#if waterStatus === "critical"}
      <button
        on:click={() => {
          /* Water the plant */
        }}>Water Now</button
      >
    {/if}
  </div>
</Link>

  <Link to="/nutrients-level">
  <div class="section {nutrientStatus} nutrients">
    <h3>Nutrients</h3>
    <progress value={plantData.nutrients} max="100"></progress>
  </div>
  </Link>
</div>

<div class="footer">
  <p>Last updated: {plantData.lastUpdated.toLocaleString()}</p>
  <Link to="/">
    <button> Back to Main Page </button>
  </Link>
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

  .aggregate-details-container {
    position: relative;
    height: 100%;
  }

  .light {
    background-color: #f9e4d4;
  }

  .water {
    background-color: #d4ebf9;
  }

  .nutrients {
    background-color: #d4f9d6;
  }

  .section {
    border-radius: 4%;
    padding: 1rem 0;
    margin-bottom: 2rem;
  }

  .section h3 {
    margin: 0;
  }

  .optimal {
    color: green;
  }
  .warning {
    color: orange;
  }
  .critical {
    color: red;
  }
  .alert {
    margin-left: 0.5rem;
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 25%;
  }
</style>

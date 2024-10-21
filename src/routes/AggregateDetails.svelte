<script>
    import { onMount } from 'svelte';
    import PlantIcon from '../components/PlantIcon.svelte'
    import { Link } from 'svelte-routing';
    
    let plantData = {
      light: 70,
      water: 30,
      nutrients: 50,
      lastUpdated: new Date()
    };
    
    $: lightStatus = getStatus(plantData.light);
    $: waterStatus = getStatus(plantData.water);
    $: nutrientStatus = getStatus(plantData.nutrients);
    
    function getStatus(value) {
      if (value < 30) return 'critical';
      if (value < 60) return 'warning';
      return 'optimal';
    }
    
    onMount(() => {
      // Fetch real data here
    });
  </script>
  
  <div class="aggregate-details">
    <PlantIcon status={waterStatus} />
    
    <h2>Plant Health Overview</h2>
    
    <div class="section {lightStatus}">
      <h3>Light</h3>
      <progress value={plantData.light} max="100"></progress>
      {#if lightStatus !== 'optimal'}
        <span class="alert">⚠️</span>
      {/if}
    </div>
    
    <div class="section {waterStatus}">
      <h3>Water</h3>
      <progress value={plantData.water} max="100"></progress>
      {#if waterStatus === 'critical'}
        <button on:click={() => {/* Water the plant */} }>Water Now</button>
      {/if}
    </div>
    
    <div class="section {nutrientStatus}">
      <h3>Nutrients</h3>
      <progress value={plantData.nutrients} max="100"></progress>
    </div>
    
    <p>Last updated: {plantData.lastUpdated.toLocaleString()}</p>
    <button>
      <Link to="/">Back to Main Page</Link>
    </button>
  </div>
  
  <style>

    .section {
      margin-bottom: 1rem;
    }
    .optimal { color: green; }
    .warning { color: orange; }
    .critical { color: red; }
    .alert { margin-left: 0.5rem; }
  </style>
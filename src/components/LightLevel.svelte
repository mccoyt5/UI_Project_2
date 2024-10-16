<!-- Thomas McCoy -->

<script>
  let lightLevel = 1000;
  let plantDesiredLight = 1000;
  let minPlantLight = Math.round(plantDesiredLight * 0.9);
  let maxPlantLight = Math.round(plantDesiredLight * 1.1);
  let changeDesiredLight = false;
  let changeDesiredLightButtonLabel = "Change Desired Light Level";

  $: if (plantDesiredLight < 0) plantDesiredLight = 0;
  $: if (plantDesiredLight > 10000) plantDesiredLight = 10000;
  $: if (typeof plantDesiredLight != "number") plantDesiredLight = 0;
  /*function randomLightGoal() {
    plantDesiredLight = Math.random() * (3000 - 100) + 100;
    minPlantLight = Math.round(plantDesiredLight * 0.9);
    maxPlantLight = Math.round(plantDesiredLight * 1.1);
  }*/

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

  function randomLightLevel() {
    lightLevel = Math.floor(Math.random() * (10000 - 1) + 1);
  }

  function brighterRoom() {
    lightLevel += 100;
  }

  function dimmerRoom() {
    lightLevel -= 100;
  }

  function info() {
    alert("To change the light level goal for your plant, simply click the \"Change Desired Light Level\" button. The \"Desired light level\" display will become editable and you can change the value. Then to set the new value click the \"Set New Desired Light Level\" button.\n\nTo simulate moving to a different room with a random light level, simply click the \"Move plant to different room with random lighting\" button.\n\nTo simulate moving to a different room with a higher light level, simply click the \"Move the plant to a brighter room\" button.\n\nTo simulate moving to a different room with a lower light level, simply click the \"Move the plant to a dimmer room\" button.")
  }
</script>


<body>
  <div>
    <br/>
    <h1>Light level</h1>
    <br/>
    <p>Current light level: {lightLevel} lux</p>
    <div id="lightLevel">
      {#if changeDesiredLight == false}
        <p>Desired light level: {plantDesiredLight} lux</p>
      {:else}
        <p>Desired light level: </p>
        <input type="number" min="0" max="10000" bind:value={plantDesiredLight}>
        <p> lux</p>
      {/if}
      <button id="update" on:click={updateDesiredLight}> {changeDesiredLightButtonLabel}</button>
    </div>
    <br/>
    <svg width="500" height="90">    
      <rect width="167" height="10" fill="red" stroke-width="1"/>
      <rect width="167" height="10" fill="green" stroke-width="1" x="167"/>
      <rect width="167" height="10" fill="red" stroke-width="1" x="334"/>
      <text x=55 y=30> &lt {minPlantLight}</text>
      <text x=215 y=30> {minPlantLight} - {maxPlantLight}</text>
      <text x=385 y=30> &gt {maxPlantLight}</text>
      {#if lightLevel < minPlantLight}
        <circle cx="83.5" cy="50" r="10" fill="red"/>
        <circle cx="250" cy="50" r="10"/>
        <circle cx="417.5" cy="50" r="10"/>
      {:else if lightLevel > maxPlantLight}
        <circle cx="83.5" cy="50" r="10"/>
        <circle cx="250" cy="50" r="10"/>
        <circle cx="417.5" cy="50" r="10" fill="red"/>
      {:else}
        <circle cx="83.5" cy="50" r="10"/>
        <circle cx="250" cy="50" r="10" fill="red"/>
        <circle cx="417.5" cy="50" r="10"/>
      {/if}
    </svg>
  </div>
  <div>
    <button on:click={randomLightLevel}> Move plant to different room with random lighting</button>
    <button on:click={brighterRoom}> Move the plant to a brighter room</button>
    <button on:click={dimmerRoom}> Move the plant to a dimmer room</button>
    <button on:click={info}> Info</button>
  </div>
</body>
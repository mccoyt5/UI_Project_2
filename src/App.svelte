<script>
  import { Router, Link, Route } from "svelte-routing";
  import LightLevel from "./routes/LightLevel.svelte";
  import NutrientsLevel from "./routes/NutrientsLevel.svelte";
  import WaterLevel from "./routes/WaterLevel.svelte";
  import WaterData from "./routes/WaterData.svelte";
  import LightData from "./routes/LightData.svelte";
  import Notification from "./components/Notification.svelte";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { expoIn, sineIn, sineInOut } from "svelte/easing";
  import {
    lightData,
    maxWaterLevel,
    neededWaterLevel,
    plantDesiredLight,
    waterData,
    kData,
    naData,
  } from "./data";
  import { lightLevel, waterLevel, kLevel, naLevel } from "./utils";
  import warningIcon from "./assets/warning.svg";
  import dangerIcon from "./assets/danger.svg";
  import AggregateDetails from "./routes/AggregateDetails.svelte";
  import {
    randomLightLevel,
    brighterRoom,
    dimmerRoom,
    addWater,
    removeWater,
    increaseK,
    increaseNa,
    decreaseK,
    decreaseNa,
  } from "./utils";
  import NutrientsData from "./routes/NutrientsData.svelte";

  let showMenu = false;
  let showContainer = false;

  let needWater;
  let needLight;
  $: needLight =
    $lightLevel < $plantDesiredLight * 0.9 ||
    $plantDesiredLight * 1.1 < $lightLevel;
  $: needWater =
    $waterLevel < $neededWaterLevel || $maxWaterLevel < $waterLevel;

  function toggleMenu() {
    showMenu = !showMenu;
  }

  function trackNewDay() {
    $lightData.push($lightLevel);
    $lightData.shift();
    $lightData = $lightData;
    $waterData.push($waterLevel);
    $waterData.shift();
    $waterData = $waterData;
    $kData.push($kLevel);
    $kData.shift();
    $kData = $kData;
    $naData.push($naLevel);
    $naData.shift();
    $naData = $naData;
  }

  function info() {
    alert(
      'To change the light level goal for your plant, simply click the "Change Desired Light Level" button. The "Desired light level" display will become editable and you can change the value. Then to set the new value click the "Set New Desired Light Level" button.\n\nTo simulate moving to a different room with a random light level, simply click the "Move plant to different room with random lighting" button.\n\nTo simulate moving to a different room with a higher light level, simply click the "Move the plant to a brighter room" button.\n\nTo simulate moving to a different room with a lower light level, simply click the "Move the plant to a dimmer room" button.\n\nTo add water to the pot, click the "Add water" button.\n\nTo decrease the amount of water in the pot, click the "Remove water" button.\n\nTo increase the amount of K in the soil, click the "Increase K" button.\n\nTo decrease the amount of K in the soil, click the "Decrease K" button.\n\nTo increase the amount of Na in the soil, click the "Increase Na" button.\n\nTo decrease the amount of Na in the soil, click the "Decrease Na" button.\n\nTo add the current statistics to the charts, click the "Add a new entry for a day" button.\n\nTo view the charts for a statistic, click on the diagram for the respective statistic.',
    );
  }

  // Show the container on component mount
  onMount(() => {
    showContainer = true;
  });
</script>

<main>
  <body>
    {#if showContainer}
      <div
        transition:fade={{ delay: 150, duration: 2200, easing: sineInOut }}
        class="container"
      >
        <Router>
          <!-- Main Page Route -->
          <Route path="/">
            <h1>LEAF SENSE</h1>
            <!-- Light button at the top -->
            <div class="top-section">
              <Notification
                icon={warningIcon}
                url="/light-data"
                backgroundColor="#f0f46f"
                hasNotification={needLight}
              >
                <p slot="message">Check your plant's lighting!</p>
              </Notification>
              <LightLevel />
              <Link id="lightData" to="/light-data">
                <button id="lightDataButton"></button>
              </Link>
            </div>

            <!-- Divider Line 1 -->
            <div class="divider top-divider"></div>

            <!-- Water button at the middle -->
            <div class="middle-section">
              <Notification
                icon={dangerIcon}
                url="/water-data"
                backgroundColor="#f66"
                hasNotification={needWater}
              >
                <p slot="message">Check your plant's water!</p>
              </Notification>
              <WaterLevel></WaterLevel>
              <Link id="waterData" to="/water-data">
                <button id="waterDataButton"></button>
              </Link>
            </div>
            <!-- Divider Line 2 -->
            <div class="divider bottom-divider"></div>

            <!-- Nutrients button in the bottom -->
            <div class="bottom-section">
              <NutrientsLevel></NutrientsLevel>
              <Link id="nutrientsData" to="/nutrients-data">
                <button id="nutrientsDataButton"></button>
              </Link>
            </div>

            <!-- -->
          </Route>

          <!-- Routes for other pages -->
          <Route path="light-level" component={LightLevel} />
          <Route path="nutrients-level" component={NutrientsLevel} />
          <Route path="water-level" component={WaterLevel} />
          <Route path="light-data" component={LightData} />
          <Route path="water-data" component={WaterData} />
          <Route path="nutrients-data" component={NutrientsData} />
          <Route path="aggregate-details" component={AggregateDetails} />
          <Route path="water-data" component={WaterData} />
        </Router>
      </div>
    {/if}
    <div id="scenarios" style="margin-right">
      <h2>Example scenarios</h2>
      <button on:click={randomLightLevel}>
        Move plant to different room with random lighting
      </button>
      <button on:click={brighterRoom}>Move the plant to a brighter room</button>
      <button on:click={dimmerRoom}>Move the plant to a dimmer room</button>
      <br />
      <br />
      <button on:click={addWater}>Add water</button>
      <button on:click={removeWater}>Remove water</button>
      <br />
      <br />
      <button on:click={increaseK}>Increase K</button>
      <button on:click={decreaseK}>Decrease K</button>
      <button on:click={increaseNa}>Increase Na</button>
      <button on:click={decreaseNa}>Decrease Na</button>
      <br />
      <br />
      <button on:click={trackNewDay}>Add a new entry for a day</button>
      <br />
      <br />
      <button on:click={info}>Info</button>
    </div>
  </body>
</main>

<style>
  .container {
    position: relative;
    display: flex;
    flex-direction: column; /* Stack elements vertically */
    width: 60%;
    min-width: 550px;
    max-width: 650px;
    min-height: 750px;
    max-height: 886px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff9f1;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .top-section {
    position: relative;
    flex: 11; /* Each section takes an equal amount of space */
    display: flex;
    justify-content: center; /* Center the content horizontally */
    align-items: center; /* Center the content vertically */
    background-color: #f9e4d4; /* Example background color */
    border: 3px solid #000000;
    border-radius: 5px;
  }

  .middle-section {
    position: relative;
    flex: 1; /* Each section takes an equal amount of space */
    display: flex;
    justify-content: center; /* Center the content horizontally */
    align-items: center; /* Center the content vertically */
    background-color: #d4ebf9; /* Example background color */
    border: 3px solid #000000;
    border-radius: 5px;
  }

  .bottom-section {
    position: relative;
    flex: 1; /* Each section takes an equal amount of space */
    display: flex;
    justify-content: center; /* Center the content horizontally */
    align-items: center; /* Center the content vertically */
    background-color: #d4f9d6; /* Example background color */
    border: 3px solid #000000;
    border-radius: 5px;
    margin-bottom: 15; /* No margin for the last section */
    /* overflow: hidden; */
    min-width: 0;
  }
  .top-divider {
    position: relative;
    top: calc(33% - 15px); /* Position between the top and middle button */
    width: 100%;
    height: 4px;
    background-color: #ccc;
    margin: 5px 0;
  }

  .bottom-divider {
    position: relative;
    top: calc(66% - 15px); /* Position between the middle and bottom button */
    width: 100%;
    height: 4px;
    background-color: #ccc;
    margin: 5px 0;
  }

  #scenarios {
    float: right;
    min-width: 300px;
    width: 100%;
    min-height: 750px;
    max-height: 886px;
    margin: 20px auto;
    padding: 20px;
    background-color: #d8d8d8;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  #lightDataButton {
    position: absolute;
    background-color: rgba(0, 0, 0, 0);
    top: 48%;
    right: 0%;
    width: 540px;
    height: 180px;
  }

  #waterDataButton {
    position: absolute;
    background-color: rgba(0, 0, 0, 0);
    top: 38%;
    right: 1%;
    width: 540px;
    height: 150px;
  }

  #nutrientsDataButton {
    position: absolute;
    background-color: rgba(0, 0, 0, 0);
    top: 44%;
    right: -0.5%;
    width: 547px;
    height: 79px;
  }
</style>

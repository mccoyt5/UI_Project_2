<script>
  import { Router, Link, Route } from 'svelte-routing';
  import LightLevel from './routes/LightLevel.svelte';
  import NutrientsLevel from './routes/NutrientsLevel.svelte';
  import WaterLevel from './routes/WaterLevel.svelte';
  import WaterData from './routes/WaterData.svelte';
  import LightData from './routes/LightData.svelte';
  import Notification from './components/Notification.svelte';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte'; 
  import { expoIn, sineIn, sineInOut } from 'svelte/easing';
  import { lightData, waterData } from './data'
  import { lightLevel, waterLevel } from './utils';
  import infoIcon from './assets/info.svg';
  import AggregateDetails from './routes/AggregateDetails.svelte';
  import { randomLightLevel, brighterRoom, dimmerRoom, addWater, removeWater } from './utils';

  let showMenu = false;
  let showContainer = false;
  
  // condition for light level
  let badLightLevel = false
  setTimeout(() => {
    badLightLevel = true
  }, 5000);

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
  }

  function info() {
    alert("To change the light level goal for your plant, simply click the \"Change Desired Light Level\" button. The \"Desired light level\" display will become editable and you can change the value. Then to set the new value click the \"Set New Desired Light Level\" button.\n\nTo simulate moving to a different room with a random light level, simply click the \"Move plant to different room with random lighting\" button.\n\nTo simulate moving to a different room with a higher light level, simply click the \"Move the plant to a brighter room\" button.\n\nTo simulate moving to a different room with a lower light level, simply click the \"Move the plant to a dimmer room\" button.")
  }

  // Show the container on component mount
  onMount(() => {
    showContainer = true;
  });
</script>



<main>
  <body>
  {#if showContainer}
    <div transition:fade={{ delay: 150, duration: 2200, easing: sineInOut}} class="container">
      <Router>
        <!-- Main Page Route -->
        <Route path="/">
          <h1>LEAF SENSE</h1>
          <!-- Light button at the top -->
          <div class="top-section">
            <Notification icon={infoIcon} url="/aggregate-details" backgroundColor="#d4ebf9" hasNotification={badLightLevel}>
              <p slot="message">Your plant needs attention!</p>  
            </Notification>
            <LightLevel />
            <Link id ="lightData" to="/light-data">
              <button id="lightDataButton"></button>
            </Link>
          </div>

          <!-- Divider Line 1 -->
          <div class="divider top-divider"></div>

          <!-- Water button at the bottom -->
          <div class="middle-section">
            <WaterLevel></WaterLevel>
            <Link id="waterData" to="/water-data">
              <button id="waterDataButton"></button>
            </Link>
          </div>
          <!-- Divider Line 2 -->
          <div class="divider bottom-divider"></div>

          
          <!-- Nutrients button in the middle -->
          <div class="bottom-section">
            <Link to="/nutrients-level">
              <button>Go to Nutrients Level Page</button>
            </Link>
          </div>
          

          <!-- -->
        </Route>

        <!-- Routes for other pages -->
        <Route path="light-level" component={LightLevel} />
        <Route path="nutrients-level" component={NutrientsLevel} />
        <Route path="water-level" component={WaterLevel} />
        <Route path="light-data" component={LightData} />
        <Route path="aggregate-details" component={AggregateDetails} />
        <Route path="water-data" component={WaterData} />
      </Router>

      <!-- Settings button at the top right -->
      <!-- <div class="settings-menu">
        <button on:click={toggleMenu} class="settings-btn">⚙️</button> -->
        <!-- {#if showMenu}
          <div class="dropdown-menu">
            <Link to="/light-level" on:click={() => showMenu = false}>Light Level</Link>
            <Link to="/nutrients-level" on:click={() => showMenu = false}>Nutrients Level</Link>
            <Link to="/water-level" on:click={() => showMenu = false}>Water Level</Link>
            <Link to="/" on:click={() => showMenu = false}>Main Page</Link>
          </div>
        {/if}
      </div> -->
    </div>
  {/if}
  <div id="right" style="margin-right">
    <h2> Example scenarios</h2>
    <button on:click={randomLightLevel}>
      Move plant to different room with random lighting
    </button>
    <button on:click={brighterRoom}>Move the plant to a brighter room</button>
    <button on:click={dimmerRoom}>Move the plant to a dimmer room</button>
    <button on:click={trackNewDay}>Add a new entry for a day</button>
    <button on:click={info}>Info</button>
    <br/>
    <br/>
    <button on:click={addWater}>Add water</button>
    <button on:click={removeWater}>Remove water</button>
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
  flex: 1; /* Each section takes an equal amount of space */
  display: flex;
  justify-content: center; /* Center the content horizontally */
  align-items: center; /* Center the content vertically */
  background-color: #d4ebf9; /* Example background color */
  border: 3px solid #000000;
  border-radius: 5px;

}

.bottom-section {
  flex: 1; /* Each section takes an equal amount of space */
  display: flex;
  justify-content: center; /* Center the content horizontally */
  align-items: center; /* Center the content vertically */
  background-color: #d4f9d6; /* Example background color */
  border: 3px solid #000000;
  border-radius: 5px;
  margin-bottom: 15; /* No margin for the last section */
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

.settings-menu {
  position: absolute;
  top: 20px;
  right: 20px;
}

.settings-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 2.5em;
}

.dropdown-menu {
  position: absolute;
  top: 65px;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 10px;
}

.dropdown-menu a {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: black;
}

.dropdown-menu a:hover {
  background-color: #f0f0f0;
}

#right {
    float: right;
    min-width: 300px;
    width:100%;  
    min-height: 750px;
    max-height: 886px;
    margin: 20px auto;
    padding: 20px;
    background-color: #a2a3a3;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  #lightDataButton {
    position: absolute;
    background-color: rgba(0, 0, 0, 0);
    top: 55%;
    right: 0%;
    width: 540px;
    height: 150px;
  }

  #waterDataButton {
    position: absolute;
    background-color: rgba(0, 0, 0, 0);
    top: 65%;
    right: 4%;
    width: 540px;
    height: 150px;
  }
</style>
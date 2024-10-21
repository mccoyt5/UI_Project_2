<script>
  import { Router, Link, Route } from 'svelte-routing';
  import LightLevel from './routes/LightLevel.svelte';
  import NutrientsLevel from './routes/NutrientsLevel.svelte';
  import WaterLevel from './routes/WaterLevel.svelte';
  import LightData from './routes/LightData.svelte';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte'; 
  import { expoIn, sineIn, sineInOut } from 'svelte/easing';

  let showMenu = false;
  let showContainer = false;

  function toggleMenu() {
    showMenu = !showMenu;
  }

  // Show the container on component mount
  onMount(() => {
    showContainer = true;
  });
</script>


<main>
  {#if showContainer}
    <div transition:fade={{ delay: 150, duration: 2200, easing: sineInOut}} class="container">
      <Router>
        <!-- Main Page Route -->
        <Route path="/">
          <h1>LEAF SENSE</h1>

          <!-- Light button at the top -->
          <div class="top-section">
            <Link to="/light-level">
              <button>Go to Light Level Page</button>
            </Link>
          
            <!-- temp button -->
            <button>
              <Link to="/light-data">Go to Light Data Page</Link>
            </button>
          </div>

          <!-- Divider Line 1 -->
          <div class="divider top-divider"></div>

          <!-- Water button at the bottom -->
          <div class="middle-section">
            <Link to="/water-level">
              <button>Go to Water Level Page</button>
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
</main>

<style>

.container { 
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
  flex: 1; /* Each section takes an equal amount of space */
  display: flex;
  justify-content: center; /* Center the content horizontally */
  align-items: center; /* Center the content vertically */
  background-color: #f9e4d4; /* Example background color */
  border: 1px solid #ccc;
  border-radius: 5px;


}

.middle-section {
  flex: 1; /* Each section takes an equal amount of space */
  display: flex;
  justify-content: center; /* Center the content horizontally */
  align-items: center; /* Center the content vertically */
  background-color: #d4ebf9; /* Example background color */
  border: 1px solid #ccc;
  border-radius: 5px;

}

.bottom-section {
  flex: 1; /* Each section takes an equal amount of space */
  display: flex;
  justify-content: center; /* Center the content horizontally */
  align-items: center; /* Center the content vertically */
  background-color: #d4f9d6; /* Example background color */
  border: 1px solid #ccc;
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
</style>

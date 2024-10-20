<script>
  import { Router, Link, Route } from 'svelte-routing';
  import LightLevel from './routes/LightLevel.svelte';
  import NutrientsLevel from './routes/NutrientsLevel.svelte';
  import WaterLevel from './routes/WaterLevel.svelte';
  import LightData from './routes/LightData.svelte';

  let showMenu = false;

  function toggleMenu() {
    showMenu = !showMenu;
  }
</script>

<main>
  <div class="container">
    <Router>
      <!-- Main Page Route -->
      <Route path="/">
        <h1>Main Page</h1>

        <!-- Light button at the top -->
        <div class="button-container top">
          <button>
            <Link to="/light-level">Go to Light Level Page</Link>
          </button>
        </div>

        <!-- Nutrients button in the middle -->
        <div class="button-container middle">
          <button>
            <Link to="/nutrients-level">Go to Nutrients Level Page</Link>
          </button>
        </div>

        <!-- Water button at the bottom -->
        <div class="button-container bottom">
          <button>
            <Link to="/water-level">Go to Water Level Page</Link>
          </button>
        </div>

        <!-- temp button -->
        <button>
            <Link to="/light-data">Go to Light Data Page</Link>
        </button>
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
</main>

<style>
  .container {
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
    position: relative;
  }

  .button-container {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }

  .top {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
  }

  .middle {
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .bottom {
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translateX(-50%);
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

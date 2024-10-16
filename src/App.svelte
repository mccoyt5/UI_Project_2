<script>
  import { Router, Link, Route } from 'svelte-routing';
  import LightLevel from './routes/LightLevel.svelte';
  import NutrientsLevel from './routes/NutrientsLevel.svelte';
  import WaterLevel from './routes/WaterLevel.svelte';

</script>

<main>
  <Router>
    <!-- Main Page Route -->
    <Route path="/">
      <h1>Main Page</h1>
      <div>
        <button>
          <Link to="/light-level">Go to Light Level Page</Link>
        </button>
        <button>
          <Link to="/nutrients-level">Go to Nutrients Level Page</Link>
        </button>
        <button>
          <Link to="/water-level">Go to Water Level Page</Link>
        </button>
      </div>
    </Route>

    <!-- Routes for other pages -->
    <Route path="light-level" component={LightLevel} />
    <Route path="nutrients-level" component={NutrientsLevel} />
    <Route path="water-level" component={WaterLevel} />
  </Router>
</main>

<style>
  /* Add your styles if necessary */
</style>
<script>
  import { waterLevel } from "../utils";
  import { maxWaterLevel, neededWaterLevel } from "../data";
</script>

<main>
  <!-- Water Level Bar -->
  <h1>Water level</h1>
  <div class="container">
    <div class="water-bar-container">
      <div class="water-bar">
        <div class="fill" style="width: {$waterLevel}%"></div>
        <div class="marker" style="left: ${$neededWaterLevel}%">Needed</div>
        <div class="marker" style="left: ${$maxWaterLevel}%">Max</div>
        <div class="line max-line"></div>
        <div class="line needed-line"></div>
      </div>
      <div class="label">
        Actual Water Level: {$waterLevel}%
      </div>
    </div>
    <!-- Legend -->
    <div class="legend">
      <div class="legend-item">
        <div class="legend-color-box max-level-box"></div>
        <div>Max Level</div>
      </div>
      <div class="legend-item">
        <div class="legend-color-box adequate-level-box"></div>
        <div>Adequate Level</div>
      </div>
    </div>
  </div>
</main>

<style>
  /* Water Level Bar Styles */
  .container {
    width: 100%;
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
    border-radius: 8px;
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .water-bar-container {
    flex: 3;
  }

  .legend {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.9rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .legend-color-box {
    width: 16px;
    height: 16px;
  }

  .max-level-box {
    background-color: red;
  }

  .adequate-level-box {
    background-color: green;
  }

  .water-bar {
    width: 350px;
    height: 40px;
    background: #e0e0e0;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
  }

  .fill {
    height: 100%;
    background: #4a90e2;
    transition: width 2s ease-in-out;
  }

  .marker {
    position: absolute;
    top: 0;
    transform: translateY(-100%);
    border-left: 2px solid red;
    font-size: 0.8rem;
    color: red;
    text-align: center;
    white-space: nowrap;
  }

  .label {
    margin-top: 0.5rem;
    text-align: center;
    font-size: 1rem;
  }

  .line {
    position: absolute;
    top: 0;
    height: 100%;
    border-left: 2px dotted;
  }

  .max-line {
    left: 90%;
    border-color: red;
    transform: translateX(-2px);
  }

  .needed-line {
    left: 70%;
    border-color: green;
    transform: translateX(-2px);
  }
</style>

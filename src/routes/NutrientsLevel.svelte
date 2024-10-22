<script>
  import { Link } from "svelte-routing";
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicInOut } from "svelte/easing";
  import { Chart, registerables } from "chart.js";
  import { kLevel, naLevel } from "../utils";

  const maxKLevel = 30000;
  const neededKLevel = 20000;
  const maxNaLevel = 100;
  const neededNaLevel = 20;
</script>

<main>
  <h1>Nutrients level</h1>
  <div class="nutrient-content-container">
    <div class="nutrients-container">
      <div class="nutrients-bar-container">
        <div class="nutrients-bar">
          <div class="fill" style="width: {$kLevel} ppm"></div>
          <div class="marker" style="left: ${neededKLevel} ppm">Needed</div>
          <div class="marker" style="left: ${maxKLevel} ppm">Max</div>
          <div class="line max-line"></div>
          <div class="line needed-line"></div>
        </div>
        <div class="label">
          K Level: {$kLevel}ppm
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
    <div class="nutrients-container">
      <div class="nutrients-bar-container">
        <div class="nutrients-bar">
          <div class="fill" style="width: {$naLevel} ppm"></div>
          <div class="marker" style="left: ${neededNaLevel} ppm">Needed</div>
          <div class="marker" style="left: ${maxNaLevel} ppm">Max</div>
          <div class="line max-line"></div>
          <div class="line needed-line"></div>
        </div>
        <div class="label">
          Na Level: {$naLevel}ppm
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
  </div>
</main>

<style>
  .nutrient-content-container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width:100%;
  }
  .nutrients-container {
    flex: 1;
    border-radius: 8px;
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    transform: scale(1);
  }

  .nutrients-bar-container {
    flex: 1;
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

  .nutrients-bar {
    width: 160px;
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

  /* Chart Container */
  .charts {
    max-width: 800px;
    margin: 2rem auto;
  }

  .chart {
    position: relative;
    height: 500px; /* Keeps the chart at the larger size */
  }

  /* Back Button Styles */
  .back-button {
    margin: 1rem;
    display: inline-block;
  }

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
</style>

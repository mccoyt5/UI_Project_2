<script>
  import { Link } from 'svelte-routing';
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';
  import { Chart, registerables } from 'chart.js';
  import { waterData } from '../data';

  // Register Chart.js components
  Chart.register(...registerables);

  // Chart.js references
  let usageChart;

  // Canvas element binding
  let usageChartCanvas;

  onMount(() => {
    initializeUsageChart();
  });

  let waterDataArray;
  waterData.subscribe((value) => {
    waterDataArray = value;
  })

  // Initialize Water Usage Analysis Chart
  function initializeUsageChart() {
    if (usageChartCanvas) {
      const ctx = usageChartCanvas.getContext('2d');
      if (ctx) {
        usageChart = new Chart(ctx, {
            type: "bar",
      options: {
        plugins: {
          title: {
            display: true,
            text: "Past 7 days of water levels"
          },
        }
      },
      data: {
        labels: ["7 days ago", "6 days ago", "5 days ago", "4 days ago", "3 days ago", "2 days ago", "1 day ago"],
        datasets: 
        [{
          label: "Water Usage (%)",
          data: waterDataArray
        }]
      }
        });
      }
    }
  }
</script>

<main>
  <!-- Charts Section -->
  <div class="charts">
    <!-- Water Usage Analysis Chart -->
    <div class="chart">
      <canvas bind:this={usageChartCanvas}></canvas>
    </div>
  </div>
  <!-- Button to go back to Main Page -->
  <Link to="/">
    <button>
      Back to Main Page
    </button>
  </Link>
</main>

<style>
    /* Water Level Bar Styles */
  .container {
    width: 100%;
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
    border: 1px solid #ccc;
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
    width: 100%;
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
</style>
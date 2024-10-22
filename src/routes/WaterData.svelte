<script>
  import { Link } from 'svelte-routing';
  import { onMount } from 'svelte';
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
  /* Chart Container */
  .charts {
    max-width: 800px;
    margin: 2rem auto;
  }

  .chart {
    position: relative;
    height: 500px; /* Keeps the chart at the larger size */
  }
</style>
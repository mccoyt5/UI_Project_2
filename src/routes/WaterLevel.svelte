<script>
  import { Link } from 'svelte-routing';
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';
  import { Chart, registerables } from 'chart.js';
  
  // Register Chart.js components
  Chart.register(...registerables);

  // Water Level Bar Variables
  const maxWaterLevel = 90; // Max water level in percentage
  const neededWaterLevel = 70; // Needed water level in percentage
  const actualWaterLevel = 60; // Actual water level in percentage

  // Animate Water Level Bar
  let fillLevel = tweened(0, {
    duration: 2000,
    easing: cubicInOut
  });

  // Chart.js references
  let usageChart;

  // Canvas element binding
  let usageChartCanvas;

  // Data for Water Usage Analysis Chart
  const usageData = {
    labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
    datasets: [
      {
        label: 'Morning',
        data: [20, 25, 30, 35, 40, 45],
        backgroundColor: '#1E90FF'
      },
      {
        label: 'Afternoon',
        data: [15, 20, 25, 30, 35, 40],
        backgroundColor: '#00FA9A'
      },
      {
        label: 'Evening',
        data: [10, 15, 20, 25, 30, 35],
        backgroundColor: '#FFD700'
      }
    ]
  };

  // Start the animation and initialize the chart on mount
  onMount(() => {
    fillLevel.set(actualWaterLevel);
    initializeUsageChart();
  });

  // Initialize Water Usage Analysis Chart
  function initializeUsageChart() {
    if (usageChartCanvas) {
      const ctx = usageChartCanvas.getContext('2d');
      if (ctx) {
        usageChart = new Chart(ctx, {
          type: 'bar',
          data: usageData,
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Water Usage Analysis'
              },
              legend: { position: 'top' }
            },
            scales: {
              x: {
                stacked: true,
                title: { display: true, text: 'Time of Day' }
              },
              y: {
                stacked: true,
                beginAtZero: true,
                title: { display: true, text: 'Usage (Liters)' }
              }
            }
          }
        });
      }
    }
  }
</script>

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

<main>
  <!-- Back Button to Main Page -->
  <div class="back-button">
    <button>
      <Link to="/">Back to Main Page</Link>
    </button>
  </div>

  <!-- Water Level Bar -->
  <div class="container">
    <div class="water-bar-container">
      <div class="water-bar">
        <div
          class="fill"
          style="width: {$fillLevel}%"
        ></div>
        <div
          class="marker"
          style="left: ${neededWaterLevel}%"
        >
          Needed
        </div>
        <div
          class="marker"
          style="left: ${maxWaterLevel}%"
        >
          Max
        </div>
        <div class="line max-line"></div>
        <div class="line needed-line"></div>
      </div>
      <div class="label">
        Actual Water Level: {$fillLevel}%
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

  <!-- Charts Section -->
  <div class="charts">
    <!-- Water Usage Analysis Chart -->
    <div class="chart">
      <canvas bind:this={usageChartCanvas}></canvas>
    </div>
  </div>
</main>

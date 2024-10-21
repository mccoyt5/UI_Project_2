<script>
  import { Link } from 'svelte-routing';
  import { onMount } from 'svelte';
  import { Chart, registerables } from 'chart.js';

  // Register Chart.js components
  Chart.register(...registerables);

  // Chart.js references
  let sodiumChart;
  let potassiumChart;

  // Canvas element bindings
  let sodiumChartCanvas;
  let potassiumChartCanvas;

  // Data for Sodium Level Analysis Chart
  const sodiumData = {
    labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
    datasets: [
      {
        label: 'Sodium Levels',
        data: [135, 137, 140, 138, 136, 139],
        backgroundColor: '#FF6347'
      }
    ]
  };

  // Data for Potassium Level Analysis Chart
  const potassiumData = {
    labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
    datasets: [
      {
        label: 'Potassium Levels',
        data: [3.5, 4.0, 4.2, 4.1, 3.8, 4.0],
        backgroundColor: '#32CD32'
      }
    ]
  };

  // Initialize charts on mount
  onMount(() => {
    initializeSodiumChart();
    initializePotassiumChart();
  });

  // Initialize Sodium Level Analysis Chart
  function initializeSodiumChart() {
    if (sodiumChartCanvas) {
      const ctx = sodiumChartCanvas.getContext('2d');
      if (ctx) {
        sodiumChart = new Chart(ctx, {
          type: 'line',
          data: sodiumData,
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Sodium Level Analysis'
              },
              legend: { position: 'top' }
            },
            scales: {
              x: {
                title: { display: true, text: 'Time of Day' }
              },
              y: {
                beginAtZero: true,
                title: { display: true, text: 'Sodium (mmol/L)' }
              }
            }
          }
        });
      }
    }
  }

  // Initialize Potassium Level Analysis Chart
  function initializePotassiumChart() {
    if (potassiumChartCanvas) {
      const ctx = potassiumChartCanvas.getContext('2d');
      if (ctx) {
        potassiumChart = new Chart(ctx, {
          type: 'line',
          data: potassiumData,
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Potassium Level Analysis'
              },
              legend: { position: 'top' }
            },
            scales: {
              x: {
                title: { display: true, text: 'Time of Day' }
              },
              y: {
                beginAtZero: true,
                title: { display: true, text: 'Potassium (mmol/L)' }
              }
            }
          }
        });
      }
    }
  }
</script>

<style>
  /* Chart Container */
  .charts {
    max-width: 800px;
    margin: 2rem auto;
  }

  .chart {
    position: relative;
    height: 300px; /* Keeps the chart at the larger size */
    margin-bottom: 2rem;
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
  <div>
    <h1>Nutrients Level Page</h1>
    <button>
      <Link to="/">Back to Main Page</Link>
    </button>
  </div>

  <!-- Charts Section -->
  <div class="charts">
    <!-- Sodium Level Analysis Chart -->
    <div class="chart">
      <canvas bind:this={sodiumChartCanvas}></canvas>
    </div>

    <!-- Potassium Level Analysis Chart -->
    <div class="chart">
      <canvas bind:this={potassiumChartCanvas}></canvas>
    </div>
  </div>
</main>

  

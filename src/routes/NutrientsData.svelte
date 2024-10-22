<script>
    import { Link } from 'svelte-routing';
    import { onMount } from 'svelte';
    import { Chart, registerables } from 'chart.js';
    import { kData, naData } from '../data';
  
    // Register Chart.js components
    Chart.register(...registerables);
  
    // Chart.js references
    let usageChartK;
    let usageChartNa;
  
    // Canvas element binding
    let usageChartCanvasK;
    let usageChartCanvasNa;
  
    onMount(() => {
      initializeUsageChartK();
      initializeUsageChartNa();
    });
  
    let kDataArray;
    kData.subscribe((value) => {
      kDataArray = value;
    })

    let naDataArray;
    naData.subscribe((value) => {
      naDataArray = value;
    })
  
    function initializeUsageChartK() {
      if (usageChartCanvasK) {
        const ctx = usageChartCanvasK.getContext('2d');
        if (ctx) {
          usageChartK = new Chart(ctx, {
              type: "bar",
        options: {
          plugins: {
            title: {
              display: true,
              text: "Past 7 days of K levels"
            },
          }
        },
        data: {
          labels: ["7 days ago", "6 days ago", "5 days ago", "4 days ago", "3 days ago", "2 days ago", "1 day ago"],
          datasets: 
          [{
            label: "K Level (ppm)",
            data: kDataArray
          }]
        }
          });
        }
      }
    }

    function initializeUsageChartNa() {
      if (usageChartCanvasNa) {
        const ctx = usageChartCanvasNa.getContext('2d');
        if (ctx) {
          usageChartNa = new Chart(ctx, {
              type: "bar",
        options: {
          plugins: {
            title: {
              display: true,
              text: "Past 7 days of Na levels"
            },
          }
        },
        data: {
          labels: ["7 days ago", "6 days ago", "5 days ago", "4 days ago", "3 days ago", "2 days ago", "1 day ago"],
          datasets: 
          [{
            label: "Na Levels (ppm)",
            data: naDataArray
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
      <div class="chart">
        <canvas bind:this={usageChartCanvasK}></canvas>
        <canvas bind:this={usageChartCanvasNa}></canvas>
        <!-- Button to go back to Main Page -->
        <Link to="/">
          <button>
            Back to Main Page
          </button>
        </Link>
      </div>
    </div>
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
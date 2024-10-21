<script>
  import { Link } from 'svelte-routing';
  import { lightData } from '../data';
  import { onMount } from 'svelte';
  import { Chart } from 'chart.js/auto';
  
  let canvas;

  let lightDataArray;
  lightData.subscribe((value) => {
    lightDataArray = value;
  })

  let averageLight = 0;

  onMount(() => {
    const context = canvas.getContext("2d");
    new Chart(context, {
      type: "line",
      options: {
        plugins: {
          title: {
            display: true,
            text: "Past 7 days of light levels"
          },
        }
      },
      data: {
        labels: ["7 days ago", "6 days ago", "5 days ago", "4 days ago", "3 days ago", "2 days ago", "1 day ago"],
        datasets: 
        [{
          label: "Light Level (lux)",
          data: lightDataArray
        }]
      }
    });

    for (let i = 0; i < lightDataArray.length; i++) {
      averageLight += lightDataArray[i];
    }
    averageLight /= 7;
    averageLight = Math.round(averageLight);
  });
</script>

<canvas bind:this={canvas} width="400" height="400" />

<h2> Average light level over the past week: {averageLight} lux</h2>

<!-- Button to go back to Main Page -->
<button>
  <Link to="/">Back to Main Page</Link>
</button>

<style>
  canvas {
    background-color: #ffffff;
  }
</style>


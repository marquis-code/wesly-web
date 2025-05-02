<template>
    <div class="h-10 w-20">
      <canvas ref="chartCanvas" width="80" height="40"></canvas>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import Chart from 'chart.js/auto';
  
  const props = defineProps({
    data: {
      type: Array as () => number[],
      required: true
    },
    color: {
      type: String,
      default: 'green'
    }
  });
  
  const chartCanvas = ref<HTMLCanvasElement | null>(null);
  let chart: Chart | null = null;
  
  const createChart = () => {
    if (!chartCanvas.value) return;
    
    const ctx = chartCanvas.value.getContext('2d');
    if (!ctx) return;
    
    // Determine chart color
    const chartColor = props.color === 'green' ? '#84cc16' : '#ef4444';
    
    // Create chart
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array(props.data.length).fill(''),
        datasets: [{
          data: props.data,
          borderColor: chartColor,
          borderWidth: 1.5,
          tension: 0.4,
          pointRadius: 0,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: false
          },
          y: {
            display: false
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        }
      }
    });
  };
  
  onMounted(createChart);
  
  // Update chart when data changes
  watch(() => props.data, () => {
    if (chart) {
      chart.destroy();
    }
    createChart();
  }, { deep: true });
  
  // Update chart when color changes
  watch(() => props.color, () => {
    if (chart) {
      chart.destroy();
    }
    createChart();
  });
  </script>
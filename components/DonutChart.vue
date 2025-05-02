<template>
    <div class="relative w-48 h-48">
      <canvas ref="chartCanvas" width="192" height="192"></canvas>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div class="text-sm">Number of tokens: 2</div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  
  const chartCanvas = ref<HTMLCanvasElement | null>(null);
  
  onMounted(() => {
    if (!chartCanvas.value) return;
    
    const ctx = chartCanvas.value.getContext('2d');
    if (!ctx) return;
    
    // Create chart
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['USD', 'USDT'],
        datasets: [{
          data: [60, 40],
          backgroundColor: ['#ec4899', '#3b82f6'],
          borderWidth: 0,
          cutout: '70%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1000,
          easing: 'easeInOutQuart'
        }
      }
    });
  });
  </script>
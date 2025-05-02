<template>
    <div class="relative h-64">
      <canvas ref="chartCanvas" width="800" height="256"></canvas>
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
    
    // Sample data
    const dates = ['Mar 7', 'Mar 8', 'Mar 9', 'Mar 10', 'Mar 11', 'Mar 12', 'Mar 13', 'Mar 14', 'Mar 15'];
    
    // Create chart
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'BTC',
            data: [37, 33, 40, 32, 35, 27, 39, 33, 38],
            borderColor: '#ef4444',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
            fill: false
          },
          {
            label: 'ETH',
            data: [32, 38, 31, 35, 41, 35, 31, 43, 38],
            borderColor: '#84cc16',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            position: 'right',
            grid: {
              color: '#f3f4f6'
            },
            ticks: {
              callback: function(value) {
                return '$' + value + ' 0.000BTC';
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        }
      }
    });
  });
  </script>
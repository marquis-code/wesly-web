<template>
    <div ref="chartContainer" class="w-full h-full"></div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import * as d3 from 'd3'
  
  const chartContainer = ref<HTMLElement | null>(null)
  let resizeObserver: ResizeObserver | null = null
  
  onMounted(() => {
    if (chartContainer.value) {
      drawChart()
      
      // Set up resize observer to redraw chart when container size changes
      resizeObserver = new ResizeObserver(() => {
        drawChart()
      })
      
      resizeObserver.observe(chartContainer.value)
    }
  })
  
  onUnmounted(() => {
    if (resizeObserver && chartContainer.value) {
      resizeObserver.unobserve(chartContainer.value)
    }
  })
  
  const drawChart = () => {
    if (!chartContainer.value) return
    
    // Clear previous chart
    d3.select(chartContainer.value).selectAll('*').remove()
    
    const container = chartContainer.value
    const width = container.clientWidth
    const height = container.clientHeight
    const margin = { top: 20, right: 20, bottom: 30, left: 40 }
    
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
    
    // Sample data
    const data = [
      { date: new Date('2020-11-01'), inflow: 300000, outflow: 250000 },
      { date: new Date('2020-12-01'), inflow: 350000, outflow: 280000 },
      { date: new Date('2021-01-01'), inflow: 450000, outflow: 320000 },
      { date: new Date('2021-02-01'), inflow: 657020, outflow: 380000 },
      { date: new Date('2021-03-01'), inflow: 550000, outflow: 420000 },
      { date: new Date('2021-04-01'), inflow: 600000, outflow: 480000 },
      { date: new Date('2021-05-01'), inflow: 520000, outflow: 450000 },
    ]
    
    // Scales
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, width - margin.left - margin.right])
    
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => Math.max(d.inflow, d.outflow)) as number])
      .range([height - margin.top - margin.bottom, 0])
    
    // Line generators
    const inflowLine = d3.line<any>()
      .x(d => x(d.date))
      .y(d => y(d.inflow))
      .curve(d3.curveBasis)
    
    const outflowLine = d3.line<any>()
      .x(d => x(d.date))
      .y(d => y(d.outflow))
      .curve(d3.curveBasis)
    
    // Draw inflow line
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)
      .attr('d', inflowLine)
    
    // Draw outflow line
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#6b7280')
      .attr('stroke-width', 2)
      .attr('d', outflowLine)
    
    // Add dots for February data point (where tooltip is shown)
    const febData = data[3] // February data
    
    svg.append('circle')
      .attr('cx', x(febData.date))
      .attr('cy', y(febData.inflow))
      .attr('r', 4)
      .attr('fill', '#3b82f6')
  }
  </script>
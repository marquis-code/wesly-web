<script setup lang="ts">
import { ref, onMounted } from 'vue';
// import Datepicker from '@vuepic/vue-datepicker';
// import '@vuepic/vue-datepicker/dist/main.css';

// Simulate real-time data for inflow and outflow
const generateRandomCashFlowData = () => {
    const inflowData = [];
    const outflowData = [];
    const dataPoints = 12; // 12 months for the cash flow
    for (let i = 0; i < dataPoints; i++) {
        inflowData.push(Math.floor(Math.random() * 1000000) + 500000);  // Random inflow
        outflowData.push(Math.floor(Math.random() * 1000000) + 300000); // Random outflow
    }
    return { inflowData, outflowData };
};

// Date range and filter options
const selectedFlow = ref('both'); // Default to 'both' flows
const selectedRange = ref('all time'); // Default to 'all time'

const chartOptions = ref({
    chart: {
        id: "cash-flow-chart",
        type: "line", // Smooth lines
        animations: {
            enabled: true,
            easing: 'easeinout',
        },
        toolbar: { show: false },
    },
    stroke: {
        curve: 'smooth', // Smooth curve
        width: 2
    },
    dataLabels: {
        enabled: false,
    },
    colors: ["#4c9af0", "#7d7d7d"], // Inflow and Outflow colors
    xaxis: {
        categories: [
            'Nov. 2020', 'Dec. 2020', 'Jan. 2021', 'Feb. 2021', 
            'Mar. 2021', 'Apr. 2021', 'May 2021'
        ], // Date categories
        labels: {
            style: {
                fontSize: '12px',
                fontWeight: 500,
                colors: '#000' // Darker font color
            }
        },
    },
    yaxis: {
        title: {
            text: 'Cash Flow (₦)',
            style: {
                fontSize: '14px',
                fontWeight: 600,
                color: '#000',
            }
        },
        labels: {
            formatter: (value) => `₦${value.toLocaleString()}`, // Financial format
            style: {
                fontSize: '14px',
                fontWeight: 500,
                colors: '#000'
            }
        },
        min: 0,
        max: 2000000, // Adjust max value based on inflow/outflow
    },
    tooltip: {
        theme: "light",
        y: {
            formatter: (value) => `₦${value.toLocaleString()}`, // Tooltip format
        }
    },
    legend: {
        position: 'top',
        horizontalAlign: 'right',
        labels: {
            colors: ['#4c9af0', '#7d7d7d'], // Match the line colors
        }
    },
    grid: {
        show: true,
        borderColor: '#e0e0e0',
    }
});

// Initial series data
const series = ref([
    {
        name: "Inflow",
        data: generateRandomCashFlowData().inflowData, // Inflow data
    },
    {
        name: "Outflow",
        data: generateRandomCashFlowData().outflowData, // Outflow data
    }
]);

// Handle date range and flow type changes
const onFlowChange = (flowType: string) => {
    selectedFlow.value = flowType;
    const data = generateRandomCashFlowData(); // Simulate data for the flow type
    updateChartData(data);
};

const updateChartData = (data: { inflowData: number[]; outflowData: number[] }) => {
    // Update the chart with new data for inflow and outflow
    series.value = [
        {
            name: "Inflow",
            data: data.inflowData
        },
        {
            name: "Outflow",
            data: data.outflowData
        }
    ];
};

// Real-time data update (based on selected flow)
onMounted(() => {
    setInterval(() => {
        // Generate new data every second
        const data = generateRandomCashFlowData();
        updateChartData(data);
    }, 1000);  // Update every 1 second
});
</script>

<template>
  <div class="bg-white rounded-lg p-3 lg:p-6 w-full">
    <section class="lg:flex justify-between space-y-4 lg:space-y-0 items-center mb-5 lg:mb-0">
      <p class="font-medium pl-8">Cash Flow</p>
      
      <!-- Flow and date range filters -->
      <div class="filters lg:pl-8 mb-4 lg:w-1/2 flex justify-end  outline-none items-end px-3 rounded-md">
        <select class="rounded-lg outline-none border-[0.5px] py-2.5 text-sm border-gray-600 px-6" v-model="selectedFlow" @change="onFlowChange(selectedFlow)">
          <option value="both">Both flows</option>
          <option value="inflow">Inflow</option>
          <option value="outflow">Outflow</option>
        </select>
        
        <select class="rounded-lg outline-none border-[0.5px] py-2.5 text-sm border-gray-600 ml-4 px-6" v-model="selectedRange" @change="onFlowChange(selectedRange)">
          <option value="all time">All time</option>
          <option value="year">Year</option>
          <option value="month">Month</option>
        </select>
      </div>
    </section>

    <!-- Chart component -->
    <apexchart type="line" height="400" :options="chartOptions" :series="series" />
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>

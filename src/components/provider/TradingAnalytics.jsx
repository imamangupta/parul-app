"use client"

import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Energy Sold (kWh)',
      data: [1200, 1900, 3000, 5000, 4000, 6000],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
    {
      label: 'Energy Bought (kWh)',
      data: [1000, 2000, 2500, 4500, 3500, 5500],
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1,
    },
  ],
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Energy Trading Activity',
    },
  },
}

export default function TradingAnalytics() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Trading Analytics</h2>
      <div className="mb-4">
        <Line data={data} options={options} />
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="font-semibold text-lg">Total Energy Sold</h3>
          <p className="text-2xl font-bold text-blue-600">21,100 kWh</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="font-semibold text-lg">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-600">₹84,400</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <h3 className="font-semibold text-lg">Avg. Price</h3>
          <p className="text-2xl font-bold text-purple-600">₹4.00/kWh</p>
        </div>
      </div>
    </div>
  )
}


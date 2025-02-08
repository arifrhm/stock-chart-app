// components/StockChart.tsx
'use client'

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StockData {
  ticker: string;
  results: {
    v: number;   // volume
    vw: number;  // volume weighted average price
    o: number;   // open price
    c: number;   // close price
    h: number;   // high price
    l: number;   // low price
    t: number;   // timestamp
    n: number;   // number of transactions
  }[];
}

interface StockChartProps {
  data: StockData;
}

const StockChart = ({ data }: StockChartProps) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const chartData = {
    labels: data.results.map(item => formatDate(item.t)),
    datasets: [
      {
        label: `${data.ticker} Price`,
        data: data.results.map(item => item.c),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        yAxisID: 'y',
      },
      {
        label: `${data.ticker} Volume`,
        data: data.results.map(item => item.v),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: `${data.ticker} Stock Price and Volume`,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Price ($)',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Volume',
        },
      },
    },
  };

  return (
    <div className="w-full h-[400px]">
      <Line options={options} data={chartData} />
    </div>
  );
};

export default StockChart;
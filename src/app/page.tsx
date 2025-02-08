// pages/index.tsx
'use client'
import { useState, useEffect } from 'react';
import StockSelector from '@/components/StockSelector';
import DateRangePicker from '@/components/DateRangePicker';
import StockChart from '@/components/StockChart';
import { useGetStockDataQuery } from '@/services/polygonApi';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, BarChart2, TrendingUp } from 'lucide-react';

const LoadingState = () => {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 95) {
          return prevProgress;
        }
        const diff = Math.random() * 10;
        return Math.min(prevProgress + diff, 95);
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[400px] w-full max-w-md mx-auto">
      <div className="mb-8 text-blue-500 animate-pulse">
        <TrendingUp size={48} />
      </div>
      <Progress value={progress} className="w-full mb-4" />
      <p className="text-sm text-gray-500">Loading stock data...</p>
    </div>
  );
};

const ErrorState = () => (
  <div className="flex flex-col items-center justify-center h-[400px] text-center">
    <div className="mb-6 text-red-500">
      <AlertCircle size={48} />
    </div>
    <h3 className="text-lg font-semibold text-red-600 mb-2">Unable to Load Stock Data</h3>
    <p className="text-gray-500 max-w-sm">
      There was an error fetching the stock data. Please try again later or select a different stock.
    </p>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-[400px] text-center">
    <div className="mb-6 text-gray-400">
      <BarChart2 size={48} />
    </div>
    <h3 className="text-lg font-semibold text-gray-600 mb-2">No Data to Display</h3>
    <p className="text-gray-500 max-w-sm">
      Please select a stock and date range to view the chart
    </p>
  </div>
);

const Home = () => {
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: '',
  });

  const { data, error, isLoading } = useGetStockDataQuery({
    symbol: selectedStocks[0],
    startDate: dateRange.start,
    endDate: dateRange.end,
  }, {
    skip: !selectedStocks[0] || !dateRange.start || !dateRange.end,
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Stock Price Chart</h1>
        <div className="grid gap-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <StockSelector onSelect={setSelectedStocks} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <DateRangePicker onDateChange={setDateRange} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            {!selectedStocks[0] || !dateRange.start || !dateRange.end ? (
              <EmptyState />
            ) : isLoading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState />
            ) : data ? (
              <StockChart data={data} />
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
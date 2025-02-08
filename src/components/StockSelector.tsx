// components/StockSelector.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Dispatch, SetStateAction, useEffect } from 'react';

interface StockSelectorProps {
  onSelect: Dispatch<SetStateAction<string[]>>;
}

const stocks = [
  { value: "AAPL", label: "Apple Inc." },
  { value: "MSFT", label: "Microsoft Corporation" },
  { value: "AMZN", label: "Amazon.com Inc." },
  { value: "GOOGL", label: "Alphabet Inc." },
  { value: "META", label: "Meta Platforms Inc." },
  { value: "TSLA", label: "Tesla Inc." },
  { value: "NVDA", label: "NVIDIA Corporation" },
  { value: "JPM", label: "JPMorgan Chase & Co." },
]

const StockSelector = ({ onSelect }: StockSelectorProps) => {
  const [selectedStocks, setSelectedStocks] = React.useState<string[]>([])

  useEffect(() => {
    onSelect(selectedStocks);
  }, [selectedStocks, onSelect]);

  const handleSelect = (value: string) => {
    setSelectedStocks((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        if (prev.length >= 3) {
          return prev;
        }
        return [...prev, value];
      }
    });
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Select Stocks (Max 3)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stocks.map((stock) => (
            <Tooltip key={stock.value}>
              <TooltipTrigger asChild>
                <Button
                  variant={selectedStocks.includes(stock.value) ? "default" : "outline"}
                  className={`w-full h-12 flex items-center justify-center ${
                    selectedStocks.includes(stock.value) ? 'bg-blue-600 hover:bg-blue-700' : ''
                  }`}
                  onClick={() => handleSelect(stock.value)}
                >
                  <span className="text-base font-medium">{stock.value}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{stock.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        {selectedStocks.length > 0 && (
          <div className="flex gap-2 items-center flex-wrap">
            <span className="text-sm text-gray-500">Selected:</span>
            {selectedStocks.map((stock) => {
              const stockInfo = stocks.find(s => s.value === stock);
              return (
                <Tooltip key={stock}>
                  <TooltipTrigger asChild>
                    <div className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-md flex items-center gap-1">
                      <span className="font-medium">{stock}</span>
                      <button
                        onClick={() => handleSelect(stock)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{stockInfo?.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}

export default StockSelector
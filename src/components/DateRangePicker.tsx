// components/DateRangePicker.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dispatch, SetStateAction } from 'react';

interface DateRangePickerProps {
  onDateChange: Dispatch<SetStateAction<{ start: string; end: string }>>;
}

const DateRangePicker = ({ onDateChange }: DateRangePickerProps) => {
  const [startDate, setStartDate] = React.useState('')
  const [endDate, setEndDate] = React.useState('')

  const handleApply = () => {
    if (startDate && endDate) {
      onDateChange({ start: startDate, end: endDate })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Select Date Range</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="start-date" className="text-sm text-gray-600">
            Start Date
          </label>
          <Input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="end-date" className="text-sm text-gray-600">
            End Date
          </label>
          <Input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      <Button 
        onClick={handleApply}
        disabled={!startDate || !endDate}
        className="w-full md:w-auto"
      >
        Apply Date Range
      </Button>
    </div>
  )
}

export default DateRangePicker
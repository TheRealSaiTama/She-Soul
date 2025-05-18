import * as React from "react";
import { format, subYears, getYear, getMonth, setYear, setMonth } from "date-fns";
import { CalendarIcon, ChevronDownIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Interface for component props
interface DatePickerDOBProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  initialYearOffset?: number;
  className?: string;
}

export function DatePickerDOB({ 
  selectedDate, 
  onDateChange, 
  initialYearOffset = 18,
  className 
}: DatePickerDOBProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const defaultInitialMonth = selectedDate || subYears(new Date(), initialYearOffset);
  const [displayMonth, setDisplayMonth] = React.useState(defaultInitialMonth);

  // Years for the dropdown - e.g., from 100 years ago to current year
  const currentSystemYear = getYear(new Date());
  const years = Array.from({ length: 100 }, (_, i) => currentSystemYear - i);
  // Months for dropdown (0-indexed)
  const monthOptions = Array.from({ length: 12 }, (_, i) => i);

  const handleDateSelect = (date: Date | undefined) => {
    onDateChange(date);
    if (date) setDisplayMonth(date); // Ensure display month updates if user picks a date in a different month
    setIsOpen(false); // Close popover on date selection
  };

  const handleYearChange = (yearValue: string) => {
    const year = parseInt(yearValue, 10);
    setDisplayMonth((prev) => setYear(prev, year));
  };

  const handleMonthChange = (monthValue: string) => {
    const monthIndex = parseInt(monthValue, 10);
    setDisplayMonth((prev) => setMonth(prev, monthIndex));
  };

  const popoverTriggerText = selectedDate 
    ? format(selectedDate, "MMMM d, yyyy") 
    : "Select your date of birth";

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal rounded-lg",
            "border-shesoul-peach/70 bg-white hover:bg-shesoul-blush/20 text-gray-700",
            "focus:ring-2 focus:ring-shesoul-bubblegum focus:border-shesoul-bubblegum",
            !selectedDate && "text-gray-500",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-shesoul-peach" />
          <span>{popoverTriggerText}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0 bg-white border-shesoul-pastel shadow-xl rounded-xl"
        align="start"
      >
        {/* Custom Header for Year/Month Select */}
        <div className="flex justify-around items-center p-3 border-b border-shesoul-pastel/50 bg-shesoul-blush/30 rounded-t-xl">
          <Select 
            value={String(getMonth(displayMonth))} 
            onValueChange={handleMonthChange}
          >
            <SelectTrigger className="w-auto min-w-[120px] focus:ring-shesoul-bubblegum border-shesoul-peach text-shesoul-peach font-medium bg-white/80 hover:bg-white transition-colors">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent className="bg-white max-h-60">
              {monthOptions.map((monthIndex) => (
                <SelectItem 
                  key={monthIndex} 
                  value={String(monthIndex)} 
                  className="text-shesoul-peach hover:bg-shesoul-blush/50 focus:bg-shesoul-blush/70 transition-colors"
                >
                  {format(new Date(0, monthIndex), "MMMM")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select 
            value={String(getYear(displayMonth))} 
            onValueChange={handleYearChange}
          >
            <SelectTrigger className="w-auto min-w-[100px] focus:ring-shesoul-bubblegum border-shesoul-peach text-shesoul-peach font-medium bg-white/80 hover:bg-white transition-colors">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="bg-white max-h-60">
              {years.map((year) => (
                <SelectItem 
                  key={year} 
                  value={String(year)} 
                  className="text-shesoul-peach hover:bg-shesoul-blush/50 focus:bg-shesoul-blush/70 transition-colors"
                >
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          month={displayMonth}
          onMonthChange={setDisplayMonth}
          initialFocus
          captionLayout="dropdown-buttons" // This uses the Selects above
          fromYear={years[years.length - 1]} // Oldest year
          toYear={years[0]} // Current year (most recent)
          disabled={(date) => date > new Date() || date < new Date(String(years[years.length -1]))}
          className="p-3 font-sans"
          classNames={{
            caption_dropdowns: "hidden", // We use our custom Selects
            head_row: "flex justify-around mb-1",
            head_cell: "text-shesoul-peach/90 rounded-md w-9 font-normal text-[0.8rem]",
            row: "flex w-full mt-2 justify-around",
            cell: cn(
              "h-9 w-9 text-center text-sm p-0 relative rounded-full focus-within:relative focus-within:z-20",
              "[&:has([aria-selected])]:bg-shesoul-pastel/70",
              "[&:has([aria-selected].day-today)]:bg-shesoul-bubblegum/80", // if selected and today
              "[&:has([aria-selected].day-outside)]:bg-shesoul-pastel/50"
            ),
            day: cn(
              "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-full hover:bg-shesoul-blush text-gray-700",
              "transition-colors duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-shesoul-bubblegum"
            ),
            day_selected: "bg-shesoul-bubblegum text-white hover:bg-shesoul-bubblegum/90 focus:bg-shesoul-bubblegum focus:text-white",
            day_today: "bg-shesoul-peach/40 text-shesoul-peach rounded-full font-semibold",
            day_outside: "text-gray-400 opacity-50 aria-selected:bg-muted/50 aria-selected:text-muted-foreground",
            day_disabled: "text-gray-400 opacity-40 cursor-not-allowed",
            nav_button: cn(
              ButtonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border-shesoul-peach/50 text-shesoul-peach hover:bg-shesoul-blush/30"
            ),
            nav_button_previous: "absolute left-1.5 top-[calc(50%-0.875rem)]",
            nav_button_next: "absolute right-1.5 top-[calc(50%-0.875rem)]",
          }}
        />
        <div className="p-3 border-t border-shesoul-pastel/50 flex justify-end bg-shesoul-blush/20 rounded-b-xl">
            <Button 
                onClick={() => setIsOpen(false)} // Or a more specific confirm action if needed
                disabled={!selectedDate}
                className={cn(
                  "bg-shesoul-bubblegum hover:bg-shesoul-bubblegum/90 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-150 ease-in-out",
                  !selectedDate && "opacity-50 cursor-not-allowed"
                )}
            >
                Confirm Birthday
            </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Helper for shadcn Button variants if needed, or ensure Button component has variant prop
// This is often part of utils or directly in button component setup
const ButtonVariants = (props: { variant?: string }) => {
  // Simplified mock, replace with actual variant logic from your setup if needed
  if (props.variant === "outline") return "border border-input bg-background hover:bg-accent hover:text-accent-foreground";
  return "";
}; 
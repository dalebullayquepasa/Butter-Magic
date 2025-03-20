"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { X, Filter, ChevronDown, ChevronUp } from "lucide-react";

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  isGlutenFree: boolean;
  isVegan: boolean;
}

interface ProductFilterProps {
  allCategories: string[];
  maxPrice: number;
  onFilterChange: (filters: FilterOptions) => void;
  className?: string;
  isMobile?: boolean;
}

// Accordion component for filter sections
interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  badge?: number | null;
}

function FilterAccordion({ title, children, defaultExpanded = false, badge = null }: AccordionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        className="flex items-center justify-between w-full py-3 px-4 text-left"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <span className="font-medium text-gray-900">{title}</span>
          {badge !== null && badge > 0 && (
            <span className="ml-2 bg-[#FF90BC] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {badge}
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>
      {isExpanded && <div className="pb-3 px-4">{children}</div>}
    </div>
  );
}

export default function ProductFilter({
  allCategories,
  maxPrice = 100,
  onFilterChange,
  className = "",
  isMobile = false,
}: ProductFilterProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [0, maxPrice],
    isGlutenFree: false,
    isVegan: false,
  });

  const [expanded, setExpanded] = useState(!isMobile);
  const [priceValue, setPriceValue] = useState<number[]>([0, maxPrice]);

  // Track active filter counts for badges
  const activeCategoryFilters = filters.categories.length;
  const activePriceFilter = 
    filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice ? 1 : 0;
  const activeDietaryFilters = 
    (filters.isGlutenFree ? 1 : 0) + (filters.isVegan ? 1 : 0);

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);

    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceValue(value);
    const newFilters = {
      ...filters,
      priceRange: [value[0], value[1]] as [number, number],
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCheckboxChange = (
    key: "isGlutenFree" | "isVegan",
    checked: boolean,
  ) => {
    const newFilters = { ...filters, [key]: checked };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters: FilterOptions = {
      categories: [],
      priceRange: [0, maxPrice] as [number, number],
      isGlutenFree: false,
      isVegan: false,
    };
    setFilters(resetFilters);
    setPriceValue([0, maxPrice]);
    onFilterChange(resetFilters);
  };

  // Count total active filters for the main badge
  const totalActiveFilters = activeCategoryFilters + activePriceFilter + activeDietaryFilters;

  return (
    <div
      className={`bg-white rounded-lg border border-gray-100 shadow-sm ${className}`}
    >
      <div className="p-3 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center">
          <Filter className="h-4 w-4 text-[#FF90BC] mr-2" />
          <h3 className="font-medium text-gray-900">Filtros</h3>
          {totalActiveFilters > 0 && (
            <span className="ml-2 bg-[#FF90BC] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalActiveFilters}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {totalActiveFilters > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700 h-8 px-2"
            >
              <X className="h-3 w-3 mr-1" /> Limpiar
            </Button>
          )}
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-gray-500 hover:text-gray-700 h-8 px-2"
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>

      {expanded && (
        <div className="divide-y divide-gray-100">
          {/* Categories Section - Accordion */}
          <FilterAccordion 
            title="Categorías" 
            badge={activeCategoryFilters}
            defaultExpanded={activeCategoryFilters > 0}
          >
            <div className="grid grid-cols-2 gap-2">
              {allCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category, checked as boolean)
                    }
                    className="h-4 w-4"
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="text-sm text-gray-700 cursor-pointer truncate"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </FilterAccordion>

          {/* Price Range Section - Accordion */}
          <FilterAccordion 
            title="Rango de Precio" 
            badge={activePriceFilter}
            defaultExpanded={activePriceFilter > 0}
          >
            <div className="pt-2 px-2">
              <Slider
                defaultValue={[0, maxPrice]}
                value={priceValue}
                max={maxPrice}
                step={1}
                onValueChange={handlePriceChange}
                className="my-4"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceValue[0]}</span>
                <span>${priceValue[1]}</span>
              </div>
            </div>
          </FilterAccordion>

          {/* Dietary Restrictions - Accordion */}
          <FilterAccordion 
            title="Características" 
            badge={activeDietaryFilters}
            defaultExpanded={activeDietaryFilters > 0}
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="gluten-free"
                  checked={filters.isGlutenFree}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("isGlutenFree", checked as boolean)
                  }
                  className="h-4 w-4"
                />
                <Label
                  htmlFor="gluten-free"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Sin Gluten
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="vegan"
                  checked={filters.isVegan}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("isVegan", checked as boolean)
                  }
                  className="h-4 w-4"
                />
                <Label 
                  htmlFor="vegan" 
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Vegano
                </Label>
              </div>
            </div>
          </FilterAccordion>
        </div>
      )}
    </div>
  );
}

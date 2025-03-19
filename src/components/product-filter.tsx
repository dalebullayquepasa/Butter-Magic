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

  return (
    <div
      className={`bg-white rounded-lg border border-gray-100 shadow-sm ${className}`}
    >
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-[#FF90BC] mr-2" />
          <h3 className="font-medium text-gray-900">Filtros</h3>
        </div>
        <div className="flex items-center gap-2">
          {(filters.categories.length > 0 ||
            filters.isGlutenFree ||
            filters.isVegan ||
            filters.priceRange[0] > 0 ||
            filters.priceRange[1] < maxPrice) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4 mr-1" /> Limpiar
            </Button>
          )}
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-gray-500 hover:text-gray-700"
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
        <div className="p-4 space-y-6">
          {/* Categories */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Categorías</h4>
            <div className="space-y-2">
              {allCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="text-gray-700 cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Rango de Precio</h4>
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
          </div>

          {/* Dietary Restrictions */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Características Especiales
            </h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="gluten-free"
                  checked={filters.isGlutenFree}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("isGlutenFree", checked as boolean)
                  }
                />
                <Label
                  htmlFor="gluten-free"
                  className="text-gray-700 cursor-pointer"
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
                />
                <Label htmlFor="vegan" className="text-gray-700 cursor-pointer">
                  Vegano
                </Label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

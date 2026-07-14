"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const countryData: Record<string, { code: string; mask: string; placeholder: string }> = {
  RU: { code: "+7", mask: "(999) 999-99-99", placeholder: "+7 (999) 999-99-99" },
  BY: { code: "+375", mask: "(99) 999-99-99", placeholder: "+375 (99) 999-99-99" },
  KZ: { code: "+7", mask: "(999) 999-99-99", placeholder: "+7 (999) 999-99-99" },
  US: { code: "+1", mask: "(999) 999-9999", placeholder: "+1 (999) 999-9999" },
};

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  country?: keyof typeof countryData;
  onCountryChange?: (country: keyof typeof countryData) => void;
}

export function PhoneInput({
  value,
  onChange,
  country = "RU",
  onCountryChange,
  className,
  ...props
}: PhoneInputProps) {
  const [internalCountry, setInternalCountry] = React.useState<keyof typeof countryData>(country);
  const [inputValue, setInputValue] = React.useState(value);

  const handleCountryChange = (newCountry: keyof typeof countryData) => {
    setInternalCountry(newCountry);
    onCountryChange?.(newCountry);
    setInputValue("");
    onChange("");
  };

  const formatInput = (raw: string): string => {
    const digits = raw.replace(/\D/g, "");
    const mask = countryData[internalCountry].mask.replace(/\D/g, "");
    let formatted = "";
    let digitIndex = 0;
    for (let i = 0; i < mask.length && digitIndex < digits.length; i++) {
      if (mask[i] === "9") {
        formatted += digits[digitIndex++];
      } else {
        formatted += mask[i];
      }
    }
    return formatted;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatInput(raw);
    setInputValue(formatted);
    onChange(formatted);
  };

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="flex gap-2">
      <Select value={internalCountry} onValueChange={handleCountryChange}>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="RU" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="RU">RU</SelectItem>
          <SelectItem value="BY">BY</SelectItem>
          <SelectItem value="KZ">KZ</SelectItem>
          <SelectItem value="US">US</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="tel"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={countryData[internalCountry].placeholder}
        className={cn("flex-1", className)}
        {...props}
      />
    </div>
  );
}

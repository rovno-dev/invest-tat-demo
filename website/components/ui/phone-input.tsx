"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Country {
  code: string;
  name: string;
  dialCode: string;
}

const countries: Country[] = [
  { code: "RU", name: "Russia", dialCode: "+7" },
  { code: "US", name: "United States", dialCode: "+1" },
  { code: "GB", name: "United Kingdom", dialCode: "+44" },
  { code: "DE", name: "Germany", dialCode: "+49" },
  { code: "FR", name: "France", dialCode: "+33" },
  { code: "IT", name: "Italy", dialCode: "+39" },
  { code: "ES", name: "Spain", dialCode: "+34" },
  { code: "CN", name: "China", dialCode: "+86" },
  { code: "JP", name: "Japan", dialCode: "+81" },
  { code: "KR", name: "South Korea", dialCode: "+82" },
  { code: "IN", name: "India", dialCode: "+91" },
  { code: "BR", name: "Brazil", dialCode: "+55" },
  { code: "MX", name: "Mexico", dialCode: "+52" },
  { code: "CA", name: "Canada", dialCode: "+1" },
  { code: "AU", name: "Australia", dialCode: "+61" },
  { code: "NL", name: "Netherlands", dialCode: "+31" },
  { code: "SE", name: "Sweden", dialCode: "+46" },
  { code: "NO", name: "Norway", dialCode: "+47" },
  { code: "DK", name: "Denmark", dialCode: "+45" },
  { code: "FI", name: "Finland", dialCode: "+358" },
  { code: "PL", name: "Poland", dialCode: "+48" },
  { code: "CZ", name: "Czech Republic", dialCode: "+420" },
  { code: "TR", name: "Turkey", dialCode: "+90" },
  { code: "UA", name: "Ukraine", dialCode: "+380" },
  { code: "BY", name: "Belarus", dialCode: "+375" },
  { code: "KZ", name: "Kazakhstan", dialCode: "+7" },
  { code: "UZ", name: "Uzbekistan", dialCode: "+998" },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  defaultCountry?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

function getCountryFromValue(value: string, defaultCountry: string): string {
  if (!value) return defaultCountry;
  const match = value.match(/^\+(\d{1,3})/);
  if (match) {
    const dialCode = `+${match[1]}`;
    const country = countries.find((c) => c.dialCode === dialCode);
    return country?.code || defaultCountry;
  }
  return defaultCountry;
}

function getLocalNumber(value: string): string {
  if (!value) return "";
  const match = value.match(/^\+(\d{1,3})(.*)$/);
  if (match) return match[2];
  return value.replace(/^\D+/, "");
}

export function PhoneInputField({
  value,
  onChange,
  error,
  defaultCountry = "RU",
  className,
  placeholder = "9123456789",
  disabled,
}: PhoneInputProps) {
  const [countryCode, setCountryCode] = React.useState(
    () => getCountryFromValue(value, defaultCountry)
  );

  React.useEffect(() => {
    setCountryCode(getCountryFromValue(value, defaultCountry));
  }, [value, defaultCountry]);

  const selectedCountry =
    countries.find((c) => c.code === countryCode) || countries[0];

  const localNumber = getLocalNumber(value);

  const handleCountryChange = (code: string) => {
    setCountryCode(code);
    const newDialCode = countries.find((c) => c.code === code)?.dialCode || "+7";
    if (localNumber.trim()) {
      onChange(`${newDialCode}${localNumber.replace(/\D/g, "")}`);
    } else {
      onChange("");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^\d+]/g, "");
    const digits = input.replace(/\D/g, "");
    const dialCode = selectedCountry.dialCode;

    if (digits.length === 0) {
      onChange("");
    } else {
      onChange(`${dialCode}${digits}`);
    }
  };

  return (
    <div className="w-full">
      <div className={cn("flex w-full gap-2", className)}>
        <Select
          value={countryCode}
          onValueChange={handleCountryChange}
          disabled={disabled}
        >
          <SelectTrigger
            className="w-[90px] shrink-0 px-3"
            aria-label="Country code"
          >
            <SelectValue>
              <span className="font-mono text-sm">{selectedCountry.dialCode}</span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {countries.map((c) => (
              <SelectItem key={c.code} value={c.code}>
                <span className="flex items-center gap-2">
                  <span className="font-mono text-xs">{c.dialCode}</span>
                  <span className="text-sm">{c.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="tel"
          value={localNumber}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          aria-invalid={!!error}
          disabled={disabled}
          className="flex-1"
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
    </div>
  );
}

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export function SelectSeason() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Vælg en sæson" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sæsoner</SelectLabel>
          <SelectItem value="2021">2021</SelectItem>
          <SelectItem value="2022">2022</SelectItem>
          <SelectItem value="2023">2023</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

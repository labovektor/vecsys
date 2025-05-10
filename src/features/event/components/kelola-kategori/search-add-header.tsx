import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  onSearch: (value: string) => void;
  onAddClick: () => void;
}

const SearchAddHeader = ({onSearch, onAddClick}: Props) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <Input
        placeholder="Cari" onChange={(e) => onSearch(e.target.value)} className="w-1/3"
      />
      <Button onClick={onAddClick} className="bg-blue-600 text-white">
        + Tambah Kategori
      </Button>
    </div>
  );
};

export default SearchAddHeader;
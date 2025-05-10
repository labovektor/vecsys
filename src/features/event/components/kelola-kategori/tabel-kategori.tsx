"use client";

import React, { useEffect, useRef, useState } from "react";
import { Category } from "./category";
import { MoreVertical } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface TableProps {
  categories: Category[];
  onEdit: (cat: Category) => void;
  onDelete: (cat: Category) => void;
}

interface ButtonProps {
  onEdit: () => void;
  onDelete: () => void;
}

const CategoryTable: React.FC<TableProps> = ({ categories, onEdit, onDelete }) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = (id: string) => { setOpenDropdownId((prev)=> (prev === id ? null : id)); }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => { document.removeEventListener('mousedown', handleClickOutside); }
  });

  return (
    <div className="max-h-[350px] overflow-y-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="border py-2 text-center">No.</th>
            <th className="border px-4 py-2 text-left">Nama Kategori</th>
            <th className="border px-4 py-2 text-left">Beregu?</th>
            <th className="border px-4 py-2 text-left">Tampilkan di pendaftaran?</th>
            <th className="border px-4 py-2 text-center">Aksi</th>
          </tr>
        </thead>
    
        <tbody>
          {categories.map((cat, index) => (
            <tr key={cat.id} className="hover:bg-gray-50">
              <td className="border py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2">{cat.name}</td>
              <td className="border px-4 py-2">{cat.is_group ? "Ya" : "Bukan"}</td>
              <td className="border px-4 py-2">{cat.visible ? "Ya" : "Tidak"}</td>
              <td className="border px-4 py-2 text-center">
                <CategoryActionDropdown
                  onEdit={() => { onEdit(cat); setOpenDropdownId(null); }}
                  onDelete={() => { onDelete(cat); setOpenDropdownId(null); }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CategoryActionDropdown: React.FC<ButtonProps> = ({ onEdit, onDelete }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="px-2 py-2 hover:bg-gray-200 rounded">
          <MoreVertical className="w-4 h-4"/>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-white border rounded w-24">
          <DropdownMenu.Item
            onClick={onEdit}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
          >
            Edit
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={onDelete}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer text-red-500"
          >
            Hapus
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default CategoryTable;
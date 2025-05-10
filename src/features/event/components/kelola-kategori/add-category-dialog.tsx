"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Category } from "./category";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  cat: Category;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mode: "add" | "edit";
}

const AddCategoryDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  cat,
  onChange,
  mode,
}) => {
  const title = mode === "add" ? "Tambah Kategori" : "Edit Kategori";
  const actionLabel = mode === "add" ? "Tambahkan Kategori" : "Simpan Perubahan";

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-30"/>
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md w-full max-w-md z-30">
            <Dialog.Title className="text-lg font-medium mb-4">{title}</Dialog.Title>
            <div className="mb-3">
              <label className="block text-sm mb-1">Nama Kategori</label>
              <input
                type="text"
                name="name"
                value={cat.name}
                onChange={onChange}
                className="w-full border px-3 py-2 rounded text-sm"
                placeholder="Nama Jenjang"
              />
            </div>
            <div className="mb-3">
              <span className="text-sm">Beregu?</span>
              <div className="flex gap-4 mt-1">
                <label>
                  <input
                    type="radio"
                    name="is_group"
                    checked={cat.is_group}
                    onChange={() =>
                      onChange({
                        target: { name: "is_group", value: "true" },
                      } as any)
                    }
                  />{" "}
                  Ya
                </label>
                <label>
                  <input
                    type="radio"
                    name="is_group"
                    checked={!cat.is_group}
                    onChange={() =>
                      onChange({
                        target: { name: "is_group", value: "false" },
                      } as any)
                    }
                  />{" "}
                  Bukan
                </label>
              </div>
            </div>
            <div className="mb-4">
              <span className="text-sm">Tampilkan di Pendaftaran?</span>
              <div className="flex gap-4 mt-1">
                <label>
                  <input
                    type="radio"
                    name="visible"
                    checked={cat.visible}
                    onChange={() =>
                      onChange({
                        target: { name: "visible", value: "true" },
                      } as any)
                    }
                  />{" "}
                  Ya
                </label>
                <label>
                  <input
                    type="radio"
                    name="visible"
                    checked={!cat.visible}
                    onChange={() =>
                      onChange({
                        target: { name: "visible", value: "false" },
                      } as any)
                    }
                  />{" "}
                  Tidak
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={onSubmit}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {actionLabel}
              </button>
            </div>
          </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddCategoryDialog;

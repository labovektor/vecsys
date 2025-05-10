"use client";

import React, { useCallback, useEffect, useState } from "react";
import axiosInstance from "@/axios/axios";

import { Category } from "../kelola-kategori/category";
import SearchAddHeader from "../kelola-kategori/search-add-header";
import CategoryTable from "../kelola-kategori/tabel-kategori";
import DeleteConfirmDialog from "../kelola-kategori/delete-confirm-dialog";
import AddCategoryDialog from "../kelola-kategori/add-category-dialog";
import { Card } from "@/components/ui/card";

const KelolaKategori = ({ id }: { id: string }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [modeForm, setModeForm] = useState<"add" | "edit">("add");
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [catForm, setCatForm] = useState<Category>({
    id: "",
    name: "",
    is_group: false,
    visible: true,
    created_at: "",
    updated_at: null
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCatForm((prev) => ({
      ...prev, [name]: name === "is_group" || name === "visible"
        ? value === "true"
        : value,
    }));
  };

  const handleSubmitCategory = async () => {
    if (!catForm.name.trim()) return;

    setIsSubmitting(true);
    try {
      if (modeForm === "add") {
        await axiosInstance.post(`admin/event/${id}/category`, {
          name: catForm.name,
          is_group: catForm.is_group,
          visible: catForm.visible,
        });
      } else if (modeForm === "edit") {
        await axiosInstance.patch(`admin/category/${catForm.id}`, {
          name: catForm.name,
          is_group: catForm.is_group,
          visible: catForm.visible
        });
      }
      setShowAddModal(false);
      fetchCategories();
    } catch (e) {
      console.error("Gagal menyimpan kategori:", e);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;

    setIsSubmitting(true);
    try {
      await axiosInstance.delete(`admin/category/${selectedCategory.id}`);
      fetchCategories();
    } catch (e) {
      console.error("Gagal menghapus kategori:", e);
    } finally {
      setIsSubmitting(false);
      setShowDeleteModal(false);
      setSelectedCategory(null);
    }
  }

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/admin/event/${id}/category`);
      setCategories(res.data.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <Card className="w-full h-full p-4 bg-white border border-gray-200 shadow-sm rounded-md">
      <SearchAddHeader
        onSearch={setSearchQuery}
        onAddClick={() => {
          setModeForm("add");
          setCatForm({
            id: "",
            name: "",
            is_group: false,
            visible: true,
            created_at: "",
            updated_at: null
          });
          setShowAddModal(true);
        }}
      />

      <CategoryTable
        categories={filteredCategories}
        onEdit={(cat) => {
          setModeForm("edit");
          setCatForm({...cat});
          setShowAddModal(true);
          setSelectedCategory(cat);
        }}
        onDelete={(cat) => {
          setShowDeleteModal(true);
          setSelectedCategory(cat);
        }}
      />

      <AddCategoryDialog
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false)
          setSelectedCategory(null);
        }}
        onSubmit={handleSubmitCategory}
        cat={catForm}
        onChange={handleChange}
        mode={modeForm}
      />

      <DeleteConfirmDialog
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedCategory(null);
        }}
        onConfirm={handleDeleteCategory}
      />

      { categories.length > 0 ? null : <p className="text-center mt-4">Belum ada data kategori.</p> }
    </Card>
  );
};

export default KelolaKategori;
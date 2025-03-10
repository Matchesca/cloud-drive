import { StorageItem } from "@/modules/dashboard/Dashboard";
import { useState } from "react";

const useEditItem = () => {
  const [editingItem, setEditingItem] = useState<StorageItem | null>(null);

  return { editingItem, setEditingItem };
};

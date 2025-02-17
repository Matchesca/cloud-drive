export type StorageItem = {
  id: string;
  name: string;
  type:
    | "Folder"
    | "PDF"
    | "Word Document"
    | "Python Script"
    | "Presentation"
    | "PNG";
  parentId: string | null; // null indicates a root-level item
  date: string;
  shared: boolean;
  size?: string; // Only for files
  extension?: string; // Only for files
};

export const mockData: StorageItem[] = [
  {
    id: "1",
    name: "Root",
    type: "Folder",
    parentId: "0",
    date: "16/2/2025, 4:34 PM",
    shared: false,
  },
  {
    id: "2",
    name: "Documents",
    type: "Folder",
    parentId: "0",
    date: "16/2/2025, 4:35 PM",
    shared: false,
  },
  {
    id: "3",
    name: "Resume",
    type: "Word Document",
    parentId: "2",
    size: "320 KB",
    date: "15/2/2025, 9:20 AM",
    shared: false,
    extension: "docx",
  },
  {
    id: "4",
    name: "homework",
    type: "Python Script",
    parentId: "1",
    size: "126 MB",
    date: "12/2/2025, 2:36 PM",
    shared: false,
    extension: "py",
  },
  {
    id: "5",
    name: "Vacation Photos",
    type: "Folder",
    parentId: "1",
    date: "5/2/2025, 5:00 PM",
    shared: true,
  },
  {
    id: "6",
    name: "beach",
    type: "PNG",
    parentId: "5",
    size: "2.3 MB",
    date: "5/2/2025, 5:10 PM",
    shared: true,
    extension: "png",
  },
  {
    id: "7",
    name: "mountain",
    type: "PNG",
    parentId: "5",
    size: "2.7 MB",
    date: "5/2/2025, 5:15 PM",
    shared: true,
    extension: "png",
  },
  {
    id: "8",
    name: "Presentation",
    type: "Presentation",
    parentId: "1",
    size: "2.1 MB",
    date: "2/2/2025, 3:45 PM",
    shared: true,
    extension: "pptx",
  },
  {
    id: "7",
    name: "mountain",
    type: "PNG",
    parentId: "5",
    size: "2.7 MB",
    date: "5/2/2025, 5:15 PM",
    shared: true,
    extension: "png",
  },
  {
    id: "7",
    name: "mountain",
    type: "PNG",
    parentId: "5",
    size: "2.7 MB",
    date: "5/2/2025, 5:15 PM",
    shared: true,
    extension: "png",
  },
  {
    id: "7",
    name: "mountain",
    type: "PNG",
    parentId: "5",
    size: "2.7 MB",
    date: "5/2/2025, 5:15 PM",
    shared: true,
    extension: "png",
  },
  {
    id: "7",
    name: "mountain",
    type: "PNG",
    parentId: "5",
    size: "2.7 MB",
    date: "5/2/2025, 5:15 PM",
    shared: true,
    extension: "png",
  },
  {
    id: "7",
    name: "lion",
    type: "PNG",
    parentId: "5",
    size: "2.1 MB",
    date: "2/2/2025, 5:15 PM",
    shared: true,
    extension: "png",
  },
];

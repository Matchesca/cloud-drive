import { StorageItem } from "@/modules/dashboard/Dashboard";
import {
  Folder,
  FileText,
  Code,
  Presentation,
  Image as ImageIcon,
  File,
  FileSpreadsheet,
  FileAudio,
  FileVideo,
} from "lucide-react";

interface MIconProps {
  type: StorageItem["type"];
}

const MIcon: React.FC<MIconProps> = ({ type }) => {
  switch (type) {
    case "Folder":
      return <Folder className="text-violet-500" />;
    case "PDF":
      return <FileText className="text-violet-500" />; // Using FileText as a stand-in for PDF
    case "Word Document":
      return <FileText />;
    case "Python Script":
      return <Code />;
    case "Presentation":
      return <Presentation />;
    case "PNG":
      return <ImageIcon className="text-blue-500" />;
    case "Excel Document":
      return <FileSpreadsheet className="text-green-500" />;
    case "Text Document":
      return <FileText />;
    case "JPEG Image":
      return <ImageIcon className="text-blue-500" />;
    case "GIF Image":
      return <ImageIcon className="text-blue-500" />;
    case "MP3 Audio":
      return <FileAudio className="text-red-500" />;
    case "MP4 Video":
      return <FileVideo className="text-red-500" />;
    case "File":
      return <File />;
    default:
      return null;
  }
};

export default MIcon;

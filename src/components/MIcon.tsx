import { StorageItem } from "@/modules/dashboard/Dashboard";
import {
  Folder,
  FileText,
  Code,
  Presentation,
  Image,
  File,
} from "lucide-react";

interface MIconProps {
  type: StorageItem["type"];
}

const MIcon: React.FC<MIconProps> = ({ type }) => {
  switch (type) {
    case "Folder":
      return <Folder />;
    case "PDF":
      return <FileText />;
    case "Word Document":
      return <FileText />;
    case "Python Script":
      return <Code />;
    case "Presentation":
      return <Presentation />;
    case "PNG":
      return <Image />;
    case "File":
      return <File />;
    default:
      return null;
  }
};

export default MIcon;

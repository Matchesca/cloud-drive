import { StorageItemTypes } from "@/server/db/schema";
import { Folder, FileText, Code, Presentation, Image } from "lucide-react";

interface MIconProps {
  type: StorageItemTypes;
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
    default:
      return null;
  }
};

export default MIcon;

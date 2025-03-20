import CircularProgress from "@/components/CircularProgress";
import { UploadCloud } from "lucide-react";

interface UploadCenterProps {
  uploadProgress: number;
  totalFiles: number;
}

const UploadCenter = ({ uploadProgress, totalFiles }: UploadCenterProps) => {
  return (
    <div className="flex h-10 flex-row items-center space-x-2 rounded-[12px] bg-violet-500/50 p-2 transition-all duration-200 hover:bg-violet-500/75">
      <CircularProgress
        radius={14}
        stroke={4}
        color="#5b21b6"
        progress={uploadProgress}
      />
      <span>
        {totalFiles} {totalFiles > 1 ? "files" : "file"}
      </span>
      <UploadCloud size={16} />
    </div>
  );
};

export default UploadCenter;

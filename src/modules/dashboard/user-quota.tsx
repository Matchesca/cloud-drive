import { QUERIES } from "@/actions/QUERIES";
import { useQuery } from "@tanstack/react-query";
import { formatBytes } from "@/lib/utils";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { User } from "lucide-react";
import clsx from "clsx";

const QUOTA = 1024 * 1024 * 1024 * 5;

const UserQuota = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["userQuota"],
    queryFn: QUERIES.fetchDriveQuota,
  });

  const { user, authLoading } = useAuth();

  // Wait until both data and auth are loaded
  if (isLoading || authLoading || !data) {
    return <Spinner />;
  }

  const percentageDocuments = Math.round((data.Documents / QUOTA) * 100);
  const percentagePhotos = Math.round((data.Photos / QUOTA) * 100);

  return (
    <div className="flex w-full flex-col rounded-[12px] border border-black/5 p-1.5 shadow-lg transition-all duration-300 hover:border-violet-500">
      <div className="flex flex-row justify-between pb-4">
        <h1 className="overflow-hidden text-ellipsis text-nowrap">
          {user?.name}
        </h1>
        <div className="flex items-center justify-center">
          <User size={14} />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <span className="text-sm">Storage:</span>
        <span className="text-xs">
          {formatBytes(data.total)} of {formatBytes(QUOTA)}
        </span>
      </div>
      {/* Storage bar */}
      <div className="pt-2">
        <div className="flex h-2 w-full overflow-hidden rounded-full bg-slate-200">
          {/* Documents segment */}
          <div
            className="border-r-[2px] border-slate-400 bg-red-500"
            style={{ width: `${percentageDocuments}%` }}
          />
          {/* Photos segment */}
          <div
            className="border-r-[2px] border-slate-400 bg-green-500"
            style={{ width: `${percentagePhotos}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserQuota;

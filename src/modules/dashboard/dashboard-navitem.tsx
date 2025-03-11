import { LucideIcon } from "lucide-react";
import * as motion from "motion/react-client";
import clsx from "clsx";

interface DashboardNavItemProps {
  label: string;
  Icon: LucideIcon;
  link: string;
  active: boolean;
}

const DashboardNavItem: React.FC<DashboardNavItemProps> = ({
  label,
  Icon,
  link,
  active,
}) => {
  return (
    <motion.div
      onClick={() => console.log(link)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={clsx(
        "mb-1 flex cursor-pointer flex-row items-center gap-x-4 rounded-[12px] p-2 text-sm font-light",
        active
          ? "bg-black text-white hover:bg-black/80"
          : "text-neutral-600 hover:bg-gray-100",
      )}
    >
      <Icon size={20} />
      {label}
    </motion.div>
  );
};

export default DashboardNavItem;

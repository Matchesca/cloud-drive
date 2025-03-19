import { motion, useMotionValue } from "motion/react";
import { Progress } from "radix-ui";

interface CircularProgressProps {
  radius: number;
  stroke: number;
  progress: number;
  color: string;
}

const CircularProgress = ({
  radius,
  stroke,
  progress,
  color,
}: CircularProgressProps) => {
  // Adjust the radius so that the entire stroke is visible
  const normalizedRadius = radius - stroke / 2;
  // Calculate the circle's circumference
  const circumference = normalizedRadius * 2 * Math.PI;
  // Calculate the strokeDashoffset based on the progress value
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  return (
    <Progress.Root value={progress} className="h-10 w-10 rounded-full">
      <div className="flex h-full w-full items-center justify-center">
        <svg height={radius * 2} width={radius * 2}>
          <g transform={`rotate(-90 ${radius} ${radius})`}>
            <circle
              cx={radius}
              cy={radius}
              r={normalizedRadius}
              className="stroke-violet-400"
              strokeWidth={stroke}
              fill="none"
            />
            <motion.circle
              key={"CircleProgress"}
              cx={radius}
              cy={radius}
              r={normalizedRadius}
              strokeLinecap={"round"}
              strokeWidth={stroke}
              stroke={color}
              fill="none"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1 }}
            />
          </g>
        </svg>
      </div>
    </Progress.Root>
  );
};

export default CircularProgress;

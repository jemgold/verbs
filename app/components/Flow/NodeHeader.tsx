import { memo } from "react";

type NodeHeaderProps = {
  name: string;
};

export const NodeHeader = memo(function NodeHeader({ name }: NodeHeaderProps) {
  return (
    <div className="text-md font-bold uppercase px-2 py-1 border-b border-gray-300 dark:border-gray-600 dark:text-gray-100">
      {name}
    </div>
  );
});

import type { ReactNode } from "react";
import { memo } from "react";
import { NodeHeader } from "./NodeHeader";

type WrapperProps = {
  name: string;
  children?: ReactNode;
};

export const NodeWrapper = memo(function NodeWrapper({
  name,
  children,
}: WrapperProps) {
  return (
    <div className="shadow-md rounded-md  w-64 flex flex-col border bg-white  border-gray-300 dark:bg-gray-900 dark:border-gray-600">
      <NodeHeader name={name} />
      <div className="flex flex-col">{children}</div>
    </div>
  );
});

import type { ReactNode } from "react";

type WrapperProps = {
  label: string;
  children?: ReactNode;
};

export const Wrapper: React.FC<WrapperProps> = ({ label, children }) => {
  return (
    <div className="shadow-md rounded-md  w-64 flex flex-col border bg-white  border-gray-300 dark:bg-gray-900 dark:border-gray-600">
      <div className="text-md font-bold uppercase px-2 py-1 border-b border-gray-300 dark:border-gray-600 dark:text-gray-100">
        {label}
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

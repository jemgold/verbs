import { ParamType } from "ethers/lib/utils";
import { FC } from "react";

type ParamFormProps = {
  params: ParamType[] | undefined;
};

export const ParamForm: FC<ParamFormProps> = ({ params }) => {
  return (
    <div className="font-bold text-sm px-4 py-2 uppercase relative">
      <form>
        {params?.map((param) => {
          return (
            <div key={param.name} className="mb-4">
              <label
                htmlFor={param.name}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {param.name}
              </label>
              <input
                type="string"
                id={param.name}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          );
        })}
      </form>
    </div>
  );
};

import type { ChangeEvent, FC } from "react";
import { memo, useMemo, useCallback, useEffect, useState } from "react";
import { FunctionFragment } from "ethers/lib/utils";
import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";

import type { Contract } from "~/utils/nouns";
import { interfaces } from "~/utils/nouns";
import { ParamForm } from "../ParamForm";
import { NodeWrapper } from "./NodeWrapper";

export type ActionData = {
  functionName?: string;
  contractName?: Contract;
};

const ActionNode: FC<NodeProps<ActionData>> = ({ id, data }) => {
  const { functionName, contractName } = data;

  const [action, setAction] = useState<FunctionFragment>();

  const actions = useMemo(() => {
    return contractName
      ? Object.values(interfaces[contractName].functions).filter(
          (a) => a.constant === false,
        )
      : [];
  }, [contractName]);

  useEffect(() => {
    actions.length &&
      setAction(actions.find((a) => a.name === functionName) || actions[0]);
  }, [actions, functionName]);

  const handleChange = useCallback(
    (evt: ChangeEvent<HTMLSelectElement>) => {
      setAction(actions.find((e) => e.name === evt.target.value));
    },
    [actions],
  );

  return (
    <NodeWrapper name="Action">
      <div>
        <div className="relative py-4 px-4">
          <Handle type="target" position={Position.Left} id="contractAddress" />

          <select
            id={id}
            className="select"
            value={action?.name}
            onChange={handleChange}
            disabled={!actions.length}
          >
            {actions.map((action) => {
              return (
                <option
                  key={`${contractName}/${action.name}/${action.inputs.length}`}
                  value={action.name}
                >
                  {action.name}
                </option>
              );
            })}
          </select>
        </div>
        {action?.inputs.length ? <ParamForm params={action?.inputs} /> : null}
        <div className="px-4 py-4 relative flex justify-center">
          <Handle type="target" position={Position.Left} id={"trigger"} />
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Trigger
          </button>
        </div>
      </div>
    </NodeWrapper>
  );
};

export default memo(ActionNode);

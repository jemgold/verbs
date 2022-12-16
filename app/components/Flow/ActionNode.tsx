import { FunctionFragment } from "ethers/lib/utils";
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { useMemo } from "react";
import { memo } from "react";
import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import type { Contract } from "~/utils/nouns";
import { interfaces } from "~/utils/nouns";
import { ParamForm } from "../ParamForm";

import { Wrapper } from "./Wrapper";

export type ActionData = {
  name: string;
};

const ActionNode: FC<NodeProps<ActionData>> = ({ data, xPos, yPos }) => {
  const NAME: Contract = "Auction";

  const [action, setAction] = useState<FunctionFragment>();

  const actions = useMemo(() => {
    return Object.values(interfaces[NAME].functions).filter(
      (a) => a.constant === false,
    );
  }, [NAME]);

  useEffect(() => {
    setAction(actions.find((a) => a.name === data.name) || actions[0]);
  }, [actions, data.name]);

  const handleChange = useCallback(
    (evt: ChangeEvent<HTMLSelectElement>) => {
      console.log(evt.target.value);
      setAction(actions.find((e) => e.name === evt.target.value));
    },
    [actions],
  );

  return (
    <Wrapper label="Action">
      <div className="py-2">
        <div className="relative py-4 px-4">
          <Handle type="target" position={Position.Left} id={"event"} />

          <select
            id="action"
            className="select"
            value={action?.name}
            onChange={handleChange}
          >
            {actions.map((action) => {
              return (
                <option
                  key={`${NAME}/${action.name}/${action.inputs.length}`}
                  value={action.name}
                >
                  {action.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="font-bold text-sm px-4 py-2 uppercase relative">
          <ParamForm params={action?.inputs} />
        </div>
        <div className="font-bold text-sm px-4 py-2 uppercase relative dark:text-white">
          <Handle type="target" position={Position.Left} id={"trigger"} />
          Trigger
        </div>
      </div>
    </Wrapper>
  );
};

export default memo(ActionNode);

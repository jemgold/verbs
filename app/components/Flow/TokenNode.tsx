import type { FC } from "react";
import { memo } from "react";
import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import { interfaces } from "~/utils/nouns";
import { shortenAddress } from "~/utils/shortenAddress";
import { NodeWrapper } from "./NodeWrapper";

const TokenNode: FC<NodeProps> = ({ data, xPos, yPos }) => {
  const connections = ["Token", "Governor", "Treasury", "Auction", "Metadata"];

  const implementedConnections = Object.keys(interfaces);

  return (
    <NodeWrapper name="DAO">
      <div className="flex p-4 border-b border-gray-300 dark:border-gray-600">
        <div className="rounded-full w-12 h-12 flex mr-2">
          <img className="rounded-full" alt={data.name} src={data.image} />
        </div>
        <div className="ml-2">
          <div className="font-bold dark:text-gray-100">{data.name}</div>
          <div className="text-gray-500 dark:text-gray-100 text-sm">
            {shortenAddress(data.address)}
          </div>
        </div>
      </div>

      <div className="py-2">
        {connections.map((connection) => {
          const valid = implementedConnections.includes(connection);
          return (
            <div
              key={connection}
              className="font-bold text-sm px-4 py-2 uppercase relative dark:text-gray-100"
            >
              {connection}
              <Handle
                type="source"
                position={Position.Right}
                id={connection}
                isConnectable={valid}
              />
            </div>
          );
        })}
      </div>
    </NodeWrapper>
  );
};

export default memo(TokenNode);

import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { NodeWrapper } from "./NodeWrapper";

export type Property<T> = {
  name: string;
  type: string;
  values: T[];
};

export type PropertySpaceData = {
  properties: Property<any>[];
};

export const PropertySpaceNode = memo(function PropertySpaceNode({
  data: { properties },
}: NodeProps<PropertySpaceData>) {
  return (
    <NodeWrapper name="PropertySpace">
      <div className="relative aspect-square">
        {/* <Handle type="target" position={Position.Left} id="properties" /> */}
        <pre className="px-4 py-4 dark:text-gray-300">
          {JSON.stringify(properties, null, 2)}
        </pre>
        <Handle type="source" position={Position.Right} id="properties" />
      </div>
    </NodeWrapper>
  );
});

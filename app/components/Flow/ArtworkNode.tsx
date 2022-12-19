import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { NodeWrapper } from "./NodeWrapper";

export type ArtworkData = {
  properties: any;
};

export const ArtworkNode = memo(function ArtworkNode({
  data: { properties },
}: NodeProps<ArtworkData>) {
  return (
    <NodeWrapper name="Artwork">
      <div className="relative aspect-square">
        <Handle type="target" position={Position.Left} id="properties" />
        <pre className="px-4 py-4 dark:text-gray-300">
          {JSON.stringify(properties, null, 2)}
        </pre>
      </div>
    </NodeWrapper>
  );
});

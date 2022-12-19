import { DragEvent, useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  useReactFlow,
} from "reactflow";
import type { Connection, Node, Edge } from "reactflow";
import shallow from "zustand/shallow";

import DAONode from "./DAONode";
import EventNode from "./EventNode";
import ActionNode from "./ActionNode";

import { RFState, useStore } from "../../store";
import { ArtworkNode } from "./ArtworkNode";
import { PropertySpaceNode } from "./PropertySpaceNode";

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = {
  dao: DAONode,
  event: EventNode,
  action: ActionNode,
  artwork: ArtworkNode,
  propertySpace: PropertySpaceNode,
};

type FlowProps = {
  initialEdges: Edge[];
  initialNodes: Node[];
};

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

function Flow({ initialEdges, initialNodes }: FlowProps) {
  const reactFlowInstance = useReactFlow();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    selector,
    shallow,
  );

  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // const onConnect = useCallback(
  //   (params: Connection | Edge) => {
  //     setEdges((eds) =>
  //       addEdge(
  //         {
  //           ...params,
  //           animated: params.targetHandle === "contractAddress-input",
  //         },
  //         eds,
  //       ),
  //     );
  //   },
  //   [setEdges],
  // );

  const handleDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }, []);

  // const handleDrop = useCallback(
  //   (event: DragEvent) => {
  //     event.preventDefault();

  //     const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
  //     const type = event.dataTransfer.getData("application/reactflow");

  //     // check if the dropped element is valid
  //     if (typeof type === "undefined" || !type) {
  //       return;
  //     }

  //     const position = reactFlowInstance.project({
  //       x: event.clientX - reactFlowBounds.left,
  //       y: event.clientY - reactFlowBounds.top,
  //     });
  //     const newNode = {
  //       id: getId(),
  //       type,
  //       position,
  //       data: { label: `${type} node` },
  //     };

  //     setNodes((nds) => nds.concat(newNode));
  //   },
  //   [reactFlowInstance],
  // );

  return (
    <div ref={reactFlowWrapper} className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={handleDragOver}
        // onDrop={handleDrop}
        nodeTypes={nodeTypes}
        snapToGrid
        snapGrid={[16, 16]}
        fitView
        maxZoom={1}
      >
        <Background
          variant={BackgroundVariant.Dots}
          className="dark:bg-gray-800"
          gap={32}
        />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;

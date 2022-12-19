import { DragEvent, useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  useReactFlow,
  NodeChange,
  XYPosition,
  OnConnectStartParams,
} from "reactflow";
import type { Connection, Node, Edge } from "reactflow";
import { v4 as uuidv4 } from "uuid";

import DAONode from "./DAONode";
import EventNode from "./EventNode";
import ActionNode from "./ActionNode";

import { RFState, useStore } from "../../store";

let id = 0;

const nodeTypes = {
  dao: DAONode,
  event: EventNode,
  action: ActionNode,
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

  // const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
  //   selector,
  //   shallow,
  // );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [lastConnectStart, setLastConnectStart] =
    useState<OnConnectStartParams>();

  const onConnect = useCallback(
    (connection: Connection) => {
      if (connection.source === null) return;
      if (connection.target === null) return;

      const newEdge: Edge = {
        id: uuidv4(),
        source: connection.source,
        target: connection.target,
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
        animated: connection.targetHandle === "contractAddress",
      };

      onEdgesChange([
        {
          type: "add",
          item: newEdge,
        },
      ]);

      if (connection.targetHandle === "contractAddress") {
        // const sourceNode = nodes.find((n) => n.id === newEdge.source);

        // const { contractAddress } = sourceNode?.data;
        // console.log(sourceNode);

        console.log(connection);

        setNodes((nxs) =>
          nxs.map((n) => {
            if (n.id !== newEdge.target) {
              return n;
            }
            return {
              ...n,
              data: {
                ...n.data,
                contractName: connection.sourceHandle,
              },
            };
          }),
        );
      }

      // if (targetNode?.type === "event") {
      //   onNodesChange([
      //     {
      //       type: ''
      //       id: newEdge.target,
      //       item: {
      //         ...targetNode.data,
      //         contractName: "foo",
      //       },
      //     },
      //   ]);
      // }
    },
    [onEdgesChange, nodes],
  );

  const handleDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }, []);

  const handleAddNode = useCallback(
    (nodeType: string, position: XYPosition) => {},
    [nodes, onEdgesChange, onNodesChange],
  );

  const handleDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      let data = {};

      switch (type) {
        case "event": {
          data = { contractName: "", eventName: "" };
        }
      }

      const newNode: Node = {
        id: uuidv4(),
        type,
        position,
        data: data,
      };

      // console.log(newNode);

      onNodesChange([{ type: "add", item: newNode }]);

      // setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  return (
    <div ref={reactFlowWrapper} className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
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

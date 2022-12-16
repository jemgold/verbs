import { useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  Panel,
} from "reactflow";
import type { Connection, Node, Edge } from "reactflow";

import CustomNode from "./CustomNode";
import TokenNode from "./TokenNode";
import EventNode from "./EventNode";
import ActionNode from "./ActionNode";

const initialNodes: Node[] = [
  {
    id: "2",
    type: "action",
    data: { name: "settleAuction" },
    position: { x: 384, y: 256 },
  },
  // {
  //   id: "3",
  //   data: { label: "Token" },
  //   position: { x: 400, y: 200 },
  // },
  {
    id: "1",
    data: {
      name: "BuilderDAO",
      address: "0xdf9b7d26c8fc806b1ae6273684556761ff02d422",
      image:
        "https://nouns.build/_next/image?url=https%3A%2F%2Fnftstorage.link%2Fipfs%2Fbafybeieifu437zmpo74odis7pg34ch5svupd5reowpsbb35wih7327mnhy%2Funnamed.png&w=128&q=75",
    },
    position: { x: 0, y: 0 },
    type: "token",
  },
  {
    id: "4",
    type: "event",
    data: { eventName: "ProposalCreated" },
    position: { x: 384, y: 0 },
  },
  {
    id: "5",
    type: "event",
    data: { eventName: "VoteCast" },
    position: { x: 384, y: 128 },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-4",
    source: "1",
    target: "4",
    animated: true,
    sourceHandle: "Governor",
  },
  {
    id: "e1-3",
    source: "1",
    target: "5",
    animated: true,
    sourceHandle: "Governor",
  },

  {
    id: "e1-2",
    source: "1",
    target: "2",
    sourceHandle: "Auction",
    animated: false,
  },
];

const nodeTypes = {
  custom: CustomNode,
  token: TokenNode,
  event: EventNode,
  action: ActionNode,
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={onNodesChange}
      edges={edges}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      snapToGrid
      snapGrid={[32, 32]}
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
  );
}

export default Flow;

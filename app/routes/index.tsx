import Flow from "~/components/Flow";

import reactFlowStyles from "reactflow/dist/style.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { json, LoaderFunction } from "@remix-run/node";
import { Edge, Node, ReactFlowProvider } from "reactflow";
import { useLoaderData } from "@remix-run/react";
import { DragEvent, DragEventHandler, useEffect } from "react";
import { ActionData } from "~/components/Flow/ActionNode";
import { DAOData } from "~/components/Flow/DAONode";
import { EventData } from "~/components/Flow/EventNode";
import { useStore } from "~/store";
import { ArtworkData } from "~/components/Flow/ArtworkNode";

const items = ["dao", "address", "event", "action"];

export const loader: LoaderFunction = () => {
  const initialNodes: Node<
    ActionData | DAOData | EventData | ArtworkData | any
  >[] = [
    {
      id: "2",
      type: "action",
      data: { contractName: "Auction", functionName: "settleAuction" },
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
      type: "dao",
    },
    {
      id: "4",
      type: "event",
      data: { contractName: "Governor", eventName: "ProposalCreated" },
      position: { x: 384, y: 0 },
    },
    {
      id: "5",
      type: "event",
      data: { contractName: "Governor", eventName: "VoteCast" },
      position: { x: 384, y: 128 },
    },
    {
      id: "6",
      type: "propertySpace",
      data: {
        properties: {
          foo: "bar",
          baz: "qux",
        },
      },
      position: {
        x: 0,
        y: 512,
      },
    },
    {
      id: "7",
      type: "artwork",
      data: {
        properties: {
          foo: "bar",
          baz: "qux",
        },
      },
      position: {
        x: 384,
        y: 512,
      },
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

  return json({
    flow: {
      edges: initialEdges,
      nodes: initialNodes,
    },
  });
};

type PaletteProps = {
  items: string[];
};
const Palette = ({ items }: PaletteProps) => {
  const handleDragStart = (
    event: DragEvent<HTMLDivElement>,
    nodeType: string,
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "copy";
  };
  return (
    <div className="grid grid-cols-3 gap-2 px-2">
      {items.map((item) => {
        return (
          <div
            key={item}
            className="dark:bg-gray-700 flex items-center justify-center aspect-square font-mono rounded-lg border dark:border-gray-500 dark:text-gray-200"
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default function Index() {
  const { flow } = useLoaderData<typeof loader>();

  useEffect(() => {
    const { nodes, edges } = flow;
    useStore.setState({ nodes, edges });
  }, [flow]);

  return (
    <div className="h-screen flex flex-col dark:bg-gray-700">
      <header className="flex py-2 px-2 justify-between items-center">
        <span className="font-mono dark:text-gray-200">Verbs</span>
        <ConnectButton />
      </header>
      <ReactFlowProvider>
        <div className="flex-grow flex">
          <Flow initialEdges={flow.edges} initialNodes={flow.nodes} />
          <div className="w-96  dark:bg-gray-900">
            Inspector
            <Palette items={items.sort()} />
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: reactFlowStyles }];
}

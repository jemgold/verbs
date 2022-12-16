import Flow from "~/components/Flow";

import reactFlowStyles from "reactflow/dist/style.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const items = ["dao", "address", "event", "action"];

type PaletteProps = {
  items: string[];
};
const Palette = ({ items }: PaletteProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 px-2">
      {items.map((item) => {
        return (
          <div className="dark:bg-gray-700 flex items-center justify-center aspect-square font-mono rounded-lg border dark:border-gray-500 dark:text-gray-200">
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default function Index() {
  return (
    <div className="h-screen flex flex-col">
      <header className="flex py-2 px-2 justify-between items-center">
        <span>Verbs</span>
        <ConnectButton />
      </header>
      <div className="flex-grow flex">
        <Flow />
        <div className="w-96  dark:bg-gray-900">
          Inspector
          <Palette items={items.sort()} />
        </div>
      </div>
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: reactFlowStyles }];
}

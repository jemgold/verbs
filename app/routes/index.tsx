import Flow from "~/components/Flow";

import reactFlowStyles from "reactflow/dist/style.css";
import styles from "~/styles/flow.css";

export default function Index() {
  return (
    <div className="app">
      <header className="app-header">Verbs</header>
      <Flow />
    </div>
  );
}

export function links() {
  return [
    { rel: "stylesheet", href: reactFlowStyles },
    { rel: "stylesheet", href: styles },
  ];
}

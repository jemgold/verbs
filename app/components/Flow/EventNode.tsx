import type { ChangeEvent, FC } from "react";
import { useEffect } from "react";
import { useCallback, useMemo, useState, memo } from "react";
import type { EventFragment } from "ethers/lib/utils";
import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";

import type { Contract } from "~/utils/nouns";
import { interfaces } from "~/utils/nouns";

import { NodeWrapper } from "./NodeWrapper";

export type EventData = {
  name: string;
};

const EventNode: FC<NodeProps<EventData>> = ({ data }) => {
  const NAME: Contract = "Governor";

  const [event, setEvent] = useState<EventFragment>();

  const events = useMemo(() => {
    return Object.values(interfaces[NAME].events);
  }, [NAME]);

  useEffect(() => {
    setEvent(events.find((e) => e.name === data.name) || events[0]);
  }, [events, data.name]);

  const handleChange = useCallback(
    (evt: ChangeEvent<HTMLSelectElement>) => {
      setEvent(events.find((e) => e.name === evt.target.value));
    },
    [events],
  );

  return (
    <NodeWrapper name="Event">
      <div className="relative py-4 px-4">
        <select
          id={NAME}
          className="select"
          value={event?.name}
          onChange={handleChange}
        >
          {events.map((event) => {
            return (
              <option key={event.name} value={event.name}>
                {event.name}
              </option>
            );
          })}
        </select>

        <Handle type="target" position={Position.Left} id="contract" />

        <Handle type="source" position={Position.Right} id="event" />
      </div>
    </NodeWrapper>
  );
};

export default memo(EventNode);

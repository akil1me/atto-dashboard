import { RefObject } from "react";

import { useEventListener } from "usehooks-ts";

type Handler = (event: MouseEvent) => void;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  buttonRef: RefObject<T>,
  mouseEvent: "mousedown" | "mouseup" = "mousedown"
): void {
  useEventListener(mouseEvent, (event) => {
    const el = ref?.current;
    const buttonEl = buttonRef.current;

    // Do nothing if clicking ref's element or descendent elements
    if (
      !el ||
      el.contains(event.target as Node) ||
      buttonEl?.contains(event.target as Node)
    ) {
      return;
    }

    handler(event);
  });
}

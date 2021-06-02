import { useEffect } from 'react';

type event = { type: string; callback: (event: any) => void };
// React.MouseEvent<HTMLElement, MouseEvent>
const useDocumentEvent = (
  events: {
    type: string;
    callback: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  }[],
): void => {
  useEffect(() => {
    events.forEach((event: event) => {
      document.addEventListener(event.type, event.callback);
    });
    return (): void =>
      events.forEach((event: event) => {
        document.removeEventListener(event.type, event.callback);
      });
  }, [events]);
};

export default useDocumentEvent;

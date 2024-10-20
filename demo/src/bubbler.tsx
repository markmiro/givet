import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const BubbleContext = createContext<{
  bubbling: boolean;
  setBubbling: (value: boolean) => void;
} | null>(null);

export function BubbleProvider({
  children,
}: {
  children: ({ startBubble }: { startBubble: () => void }) => ReactNode;
}) {
  const [bubbling, setBubbling] = useState(false);
  const startBubble = () => {
    console.log("start submit");
    setBubbling(true);
  };

  return (
    <BubbleContext.Provider value={{ bubbling, setBubbling }}>
      {children({ startBubble })}
    </BubbleContext.Provider>
  );
}

export function BubbleForm({
  children,
  ...formProps
}: { children: ReactNode } & React.FormHTMLAttributes<HTMLFormElement>) {
  return (
    <BubbleProvider>
      {({ startBubble }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            startBubble();
          }}
          // put rest of props so they can overide the onSubmit
          {...formProps}
        >
          {children}
        </form>
      )}
    </BubbleProvider>
  );
}

export function useBubbler(cb: () => void) {
  const ctx = useContext(BubbleContext);
  if (!ctx) {
    throw new Error("useSubmitLeaf must be used within a SubmitProvider");
  }
  const { bubbling, setBubbling } = ctx;

  useEffect(() => {
    if (bubbling) {
      console.log("submit cb()");
      cb();
    }
    // batching means it doesn't matter how many times we call this.
    setBubbling(false);
  }, [bubbling, setBubbling, cb]);
}

export function BubbleArray<T>({
  children,
  length,
  onBubble,
}: {
  children: (onBubble: (data: T) => void) => ReactNode;
  length: number;
  onBubble: (data: T[]) => void;
}) {
  const arrayRef = useRef<T[]>([]);

  const getIt = (data: T) => {
    arrayRef.current.push(data);
    if (arrayRef.current.length === length) {
      onBubble(arrayRef.current);
      arrayRef.current = [];
    }
  };

  return children(getIt);
}

// TODO: add BubbleObject?

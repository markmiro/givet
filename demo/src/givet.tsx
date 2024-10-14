import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const SubmitContext = createContext<{
  submitting: boolean;
  setSubmitting: (value: boolean) => void;
} | null>(null);

export function SubmitProvider({
  children,
}: {
  children: ({ startSubmit }: { startSubmit: () => void }) => ReactNode;
}) {
  const [submitting, setSubmitting] = useState(false);
  const startSubmit = () => {
    console.log("start submit");
    setSubmitting(true);
  };

  return (
    <SubmitContext.Provider value={{ submitting, setSubmitting }}>
      {children({ startSubmit })}
    </SubmitContext.Provider>
  );
}

export function useSubmitLeaf(cb: () => void) {
  const ctx = useContext(SubmitContext);
  if (!ctx) {
    throw new Error("useSubmitLeaf must be used within a SubmitProvider");
  }
  const { submitting, setSubmitting } = ctx;

  useEffect(() => {
    if (submitting) {
      console.log("submit cb()");
      cb();
    }
    // batching means it doesn't matter how many times we call this.
    setSubmitting(false);
  }, [submitting, setSubmitting, cb]);
}

export function GetArray({
  children,
  length,
  pushUp,
}: {
  children: (pushUp: (data: unknown) => void) => ReactNode;
  length: number;
  pushUp: (data: unknown) => void;
}) {
  const arrayRef = useRef<unknown[]>([]);

  const getIt = (data: unknown) => {
    arrayRef.current.push(data);
    if (arrayRef.current.length === length) {
      pushUp(arrayRef.current);
      arrayRef.current = [];
    }
  };

  return children(getIt);
}

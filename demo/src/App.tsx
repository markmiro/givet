import { useState } from "react";
import { randomSuperbWord } from "superb";
import { BubbleArray, BubbleProvider, useBubbler } from "./bubbler";
import { uid } from "uid";
import { z } from "zod";

const submitSchema = z.array(z.string());

submitSchema.parse(["tuna"]);

type SubmitType = z.infer<typeof submitSchema>;
type SubmitItem = SubmitType[number];

export default function App() {
  const ids = [uid(3), uid(3), uid(3)];
  const [count, setCount] = useState(0);
  const onSubmit = (data: SubmitType) => {
    // This is where we'd submit the data to the server.
    console.log("finish submit", data);
  };

  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>

      <BubbleProvider>
        {({ startBubble }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              startBubble();
            }}
          >
            <BubbleArray<SubmitItem> onBubble={onSubmit} length={ids.length}>
              {(onBubble) =>
                ids.map((id) => <Child key={id} id={id} onBubble={onBubble} />)
              }
            </BubbleArray>
            <button type="submit">Submit</button>
          </form>
        )}
      </BubbleProvider>
    </>
  );
}

function Child({
  id,
  onBubble,
}: {
  id: string;
  onBubble: (data: string) => void;
}) {
  const [value, setValue] = useState(randomSuperbWord());

  useBubbler(() => onBubble(value.toUpperCase()));

  return (
    <div>
      <pre>{id}</pre>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}

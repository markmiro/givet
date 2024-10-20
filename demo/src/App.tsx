import { useState } from "react";
import { randomSuperbWord } from "superb";
import { GetArray, SubmitProvider, useSubmitLeaf } from "./givet";
import { uid } from "uid";

export default function App() {
  const ids = [uid(3), uid(3), uid(3)];
  const [count, setCount] = useState(0);
  const [submitted, setSubmitted] = useState<unknown>(false);
  const onSubmit = (data: unknown) => setSubmitted(data);

  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>

      <SubmitProvider>
        {({ startSubmit }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              startSubmit();
            }}
          >
            <GetArray pushUp={onSubmit} length={ids.length}>
              {(pushUp) =>
                ids.map((id) => <Child key={id} id={id} pushUp={pushUp} />)
              }
            </GetArray>
            <button type="submit">Submit</button>
          </form>
        )}
      </SubmitProvider>
      {submitted && <pre>{JSON.stringify(submitted, null, 2)}</pre>}
    </>
  );
}

function Child({
  id,
  pushUp,
}: {
  id: string;
  pushUp: (data: unknown) => void;
}) {
  const [value, setValue] = useState(randomSuperbWord());

  useSubmitLeaf(() => pushUp(value.toUpperCase()));

  return (
    <div>
      <pre>{id}</pre>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}

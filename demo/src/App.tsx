import { useState } from 'react';
import { randomSuperbWord } from 'superb';
import { BubbleArray, BubbleForm, useBubbler } from './bubbler';
import { uid } from 'uid';
import { z } from 'zod';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

const submitSchema = z.array(z.string());

submitSchema.parse(['tuna']);

type SubmitType = z.infer<typeof submitSchema>;
type SubmitItem = SubmitType[number];

export default function App() {
  const ids = [uid(3), uid(3), uid(3)];
  const [count, setCount] = useState(0);
  const onSubmit = (data: SubmitType) => {
    // This is where we'd submit the data to the server.
    console.log('finish submit', data);
  };

  return (
    <div className="max-w-screen-sm mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Givet Form Example</h1>
      <Button variant="secondary" onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </Button>
      <BubbleForm className="space-y-2">
        {/* You'd expect submit to be at the BubbleForm but it's not because for submission is only triggered at that level. The actual submission only happens when the data is done bubbling up */}
        <BubbleArray<SubmitItem> onBubble={onSubmit} length={ids.length}>
          {(onBubble) => ids.map((id) => <Child key={id} id={id} onBubble={onBubble} />)}
        </BubbleArray>
        <Button type="submit">Submit</Button>
      </BubbleForm>
    </div>
  );
}

function Child({ id, onBubble }: { id: string; onBubble: (data: string) => void }) {
  const [value, setValue] = useState(randomSuperbWord());

  useBubbler(() => onBubble(value.toUpperCase()));

  return (
    <div>
      <pre>{id}</pre>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}

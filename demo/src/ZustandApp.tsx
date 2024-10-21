import { create } from 'zustand';
import { Button } from './components/ui/button';

interface BearState {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
}

const useStore = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));

function BearCounter() {
  const bears = useStore((state) => state.bears);
  return <h1>{bears} around here...</h1>;
}

function Controls() {
  const increasePopulation = useStore((state) => state.increasePopulation);
  const removeAllBears = useStore((state) => state.removeAllBears);
  const updateBears = useStore((state) => state.updateBears);

  return (
    <div className="flex gap-2">
      <Button variant="secondary" onClick={increasePopulation}>
        +1 bear
      </Button>
      <Button variant="secondary" onClick={() => updateBears(1000)}>
        Add a ton of bears
      </Button>
      <Button variant="secondary" onClick={removeAllBears}>
        Kill them all
      </Button>
    </div>
  );
}

export default function ZustandApp() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Bears</h1>
      <BearCounter />
      <Controls />
    </div>
  );
}

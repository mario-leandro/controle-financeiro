import { Plus } from "lucide-react";

export default function BotaoFlutuante({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="fixed bottom-6 right-6 bg-purple-950 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition">
      <Plus />
    </button>
  );
}

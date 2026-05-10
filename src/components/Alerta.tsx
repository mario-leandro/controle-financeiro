export default function Alerta({
  success,
  message,
  onClose,
}: {
  success: boolean;
  message: string;
  onClose?: () => void;
}) {
  const colors = success ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed bottom-5 right-4 flex flex-col gap-3 z-50 min-w-[250px] max-w-[350px]
        ${colors} text-white
        px-4 py-3 rounded-lg shadow-lg
        flex items-start gap-3
        animate-[fadeIn_0.3s_ease]`}
    >
      <p className="flex-1 text-sm font-medium">{message}</p>

      <button onClick={onClose} className="ml-2 text-white/70 hover:text-white">
        Fechar
      </button>
    </div>
  );
}

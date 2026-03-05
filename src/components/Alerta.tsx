export default function AlertaErr({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg">
      <p>{message}</p>
      <button
        onClick={onClose}
        className="mt-2 bg-white text-red-500 px-3 py-1 rounded hover:bg-gray-200 transition"
      >
        Fechar
      </button>
    </div>
  );
}

export function AlertaSucesso({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg">
      <p>{message}</p>
      <button
        onClick={onClose}
        className="mt-2 bg-white text-green-500 px-3 py-1 rounded hover:bg-gray-200 transition"
      >
        Fechar
      </button>
    </div>
  );
}

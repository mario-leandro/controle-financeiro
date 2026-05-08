export default function Alerta({
  success,
  message,
  onClose,
}: {
  success: boolean;
  message: string;
  onClose?: () => void;
}) {
  let successColor;

  if (success) {
    successColor = "bg-green-50";
  } else {
    successColor = "bg-red-500";
  }

  return (
    <div
      className={`fixed w-2 top-4 right-4 ${successColor} text-white p-4 rounded shadow-lg z-10`}
    >
      <p>{message}</p>
      <button
        onClick={onClose}
        className={`mt-2 bg-white ${successColor} px-3 py-1 rounded hover:bg-gray-200 transition`}
      >
        Fechar
      </button>
    </div>
  );
}

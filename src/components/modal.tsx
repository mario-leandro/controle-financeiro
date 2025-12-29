"use client"
export default function Modal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <div className="fixed bottom-24 right-6 flex justify-center items-center" onClick={onClose}>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Escolha uma opção</h2>
                <div className="flex flex-col gap-4">
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Adicionar Ganho
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Adicionar Gasto
                    </button>
                </div>
            </div>
        </div>
    );
}
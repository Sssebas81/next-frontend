"use client";

import { gameService } from "@/app/(dashboard)/feed/services/game.service";

type DeleteGameProps = {
    id: number;
};

export default function DeleteGameButton({ id }: DeleteGameProps) {
    const handleDelete = async () => {
        if (!window.confirm("¿Estás seguro de que deseas borrar este juego?")) {
            return;
        }

        try {
            await gameService.deleteGame(id);
            alert("Game deleted successfully");
            window.location.reload();
            
        } catch (error) {
            alert("Error deleting game");
            console.error(error);
        }
    };

    return (
        <button onClick={handleDelete} className="btn btn-outline btn-error btn-sm">
            Delete
        </button>
    );
}

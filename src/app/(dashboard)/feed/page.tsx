import DeleteGameButton from "@/common/components/DeleteGameButton";
import { gameService, type GameResponse } from "./services/game.service"

export default async function Feed() {
    const games = await gameService.getGames();
    return (
        <div className="container mx-auto p-4">
                    <h2 className="text-3xl font-bold mb-6">Games</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {games.map((game: GameResponse) => (
                            <div key={game.id} className="card bg-base-100 image-full w-full shadow-lg">
                                <div className="card-body">
                                    <h2 className="card-title text-2xl">{game.name}</h2>
                                    <p className="text-base">{game.description}</p>
                                    <div className="card-actions justify-end">
                                        <DeleteGameButton id={game.id} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

        
    )
}
"use client";

import { CreateGameRequest, GameCategory, gameService } from "@/app/(dashboard)/feed/services/game.service";
import { useRef } from "react";

export default function CreateGameForm() {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(formRef.current!);

        const gameData: CreateGameRequest = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            minPlayers: parseInt(formData.get("min_players") as string) || 2,
            maxPlayers  : parseInt(formData.get("max_players") as string) || 4,
            category: formData.get("category") as GameCategory || GameCategory.BOARD,
            createdBy: 1, // TODO: Replace with actual user ID from auth context
        };

        try {
            await gameService.createGame(gameData);
            alert("Game created successfully!");
            formRef.current?.reset();
        } catch (error) {
            alert("Error creating game");
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-4 mb-8">
            <div className="card card-bordered bg-base-100 shadow-lg">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold mb-4">Create New Game</h2>
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="label" htmlFor="name">
                                <span className="label-text font-semibold">Game Name</span>
                            </label>
                            <input
                                id="name"
                                name="name"
                                placeholder="Enter game name"
                                type="text"
                                required
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="label" htmlFor="description">
                                <span className="label-text font-semibold">Description</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Enter game description"
                                required
                                className="textarea textarea-bordered w-full"
                                rows={3}
                            />
                        </div>
                        <div>
                            <label className="label" htmlFor="min_players">
                                <span className="label-text font-semibold">Minimum Players</span>
                            </label>
                            <input
                                id="min_players"
                                name="min_players"
                                type="number"
                                min="1"
                                max="10"
                                defaultValue="2"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="label" htmlFor="max_players">
                                <span className="label-text font-semibold">Maximum Players</span>
                            </label>
                            <input
                                id="max_players"
                                name="max_players"
                                type="number"
                                min="2"
                                max="10"
                                defaultValue="4"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="label" htmlFor="category">
                                <span className="label-text font-semibold">Category</span>
                            </label>
                            <select
                                id="category"
                                name="category"
                                defaultValue={GameCategory.BOARD}
                                className="select select-bordered w-full"
                            >
                                {Object.values(GameCategory).map((category) => (
                                    <option key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="createdBy">Created By</label>
                            <input
                                id="createdBy"
                                name="createdBy"
                                type="number"
                                defaultValue="1"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">
                            Create Game
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

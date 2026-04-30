import axiosClient from "@/lib/axios/client"
import { jwtDecode } from "jwt-decode";



export type GameResponse = {
    id: number,
    name: string,
    description: string
}

export enum GameCategory {
    BOARD = 'board',
    CARD = 'card',
    DICE = 'dice',
    STRATEGY = 'strategy',
    PARTY = 'party',
    COOPERATIVE = 'cooperative',
    DECK_BUILDING = 'deck_building',
    WORD = 'word',
    TRIVIA = 'trivia',
    ABSTRACT = 'abstract',
    FAMILY = 'family',
    THEMATIC = 'thematic',
    WAR = 'war',
    PUZZLE = 'puzzle',
    ROLE_PLAYING = 'role_playing',
}

export type CreateGameRequest = {
    name: string,
    description: string,
    minPlayers: number,
    maxPlayers: number,
    category: GameCategory,
    createdBy: number
}


class GameService {
    async getGames() {
        const result = await axiosClient.get<GameResponse[]>("/games");
        return result.data
    }

    async createGame(payload: CreateGameRequest) {

        const token = localStorage.getItem("token") || "";
        const decoded = jwtDecode(token);
        const createdBy = Number(decoded.sub); // Adjust based on your token structure
        const result = await axiosClient.post<GameResponse>("/games", { ...payload, createdBy });
        return result.data
    }

    async deleteGame(id: number) {
        const result = await axiosClient.delete(`/games/${id}`);
        return result.data
    }
}

export const gameService = new GameService()
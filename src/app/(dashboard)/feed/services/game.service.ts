import axiosClient from "@/lib/axios/client"



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
    createdBy: number, // TODO: Replace with actual user ID from auth context
}

 

class GameService {
    async getGames() {
        const result = await axiosClient.get<GameResponse[]>("/games");
        return result.data
    }

    async createGame(game: CreateGameRequest) {
        const result = await axiosClient.post<GameResponse>("/games", game);
        return result.data
    }

    async deleteGame(id: number) {
        const result = await axiosClient.delete(`/games/${id}`);
        return result.data
    }
}

export const gameService = new GameService()
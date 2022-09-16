import { useHangman } from '~/composables/useHangman'

interface Game {
    name: string
    route: string
}



export const useGames = () => {
    const games: Game[] = [
        {
            name: 'Target',
            route: '/target',
        },
        {
            name: 'Hangman',
            route: '/hangman',
        },
    ]

    return {
        games,
    }
}

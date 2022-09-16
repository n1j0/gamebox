interface Game {
    name: string
    route: string
}

const hangmanWords: string[] = [
    'Bumblebee',
    'Bird',
    'Cat',
    'Cow',
    'Dog',
    'Fish',
    'Giraffe',
    'Horse',
    'Monkey',
    'Rabbit',
    'Spider',
    'Snake',
    'Banana',
    'Bubblegum',
    'Pizza',
    'Popcorn',
    'Sandwich',
    'Spaghetti',
    'Taco',
    'Archery',
    'Baseball',
    'Basketball',
    'Football',
    'Golf',
    'Skiing',
    'Soccer',
    'Tennis',
]

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

    const hangmanWord: () => string = () => hangmanWords[Math.floor(Math.random() * (hangmanWords.length))]

    return {
        games,
        hangmanWord,
    }
}

<script lang="ts" setup>
import { ref } from 'vue'
import { useGames } from '~/composables/useGames'

const { hangmanWord } = useGames()

const wordToGuess = ref<string>('')
const guessedWord = ref<string>('')
const chars = ref<string[]>([])
const guess = ref<string>('')
const remainingGuesses = ref<number>(0)
const result = ref<string>('')

const setInitialValues = () => {
    wordToGuess.value = hangmanWord()
    guessedWord.value = wordToGuess.value.replace(/./g, '*')
    chars.value = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'k', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    remainingGuesses.value = 7
    result.value = ''
}

setInitialValues()

const checkCharacter = () => {
    if (remainingGuesses.value === 0) {
        return
    }

    if (guess.value.length !== 1) {
        return
    }

    chars.value[chars.value.findIndex(c => c === guess.value)] = '-'

    const indices = []

    wordToGuess.value.split('').forEach((char, idx) => {
        if (char.toLowerCase() === guess.value.toLowerCase()) {
            indices.push(idx)
        }
    })

    guess.value = ''

    if (indices.length === 0) {
        remainingGuesses.value--

        if (remainingGuesses.value === 0) {
            result.value = `Sorry, try it again. Solution: ${wordToGuess.value}`
        }
        return
    }

    indices.forEach(idx => {
        guessedWord.value = `${guessedWord.value.substring(0, idx)}${wordToGuess.value.charAt(idx)}${guessedWord.value.substring(idx + 1)}`
    })

    if (!guessedWord.value.includes('*')) {
        result.value = `Great, start over. Solution: ${wordToGuess.value}`
    }
}

const reload = () => {
    setInitialValues()
}
</script>

<template>
    <main>
        <div v-if="!result">
            <p>Remaining guesses: {{ remainingGuesses }}</p>
            <p>{{ guessedWord }}</p>
            <ul>
                <li v-for="char in chars" :key="char">{{ char }}</li>
            </ul>
            <form @submit.stop.prevent="checkCharacter">
                <input v-model="guess" type="text"/>
                <button type="submit">Try character!</button>
            </form>
        </div>
        <template v-else >
            <p>{{ result }}</p>
            <button @click="reload">Restart</button>
        </template>
    </main>
</template>

<style scoped>
main {
    width: 100vw;
    height: 100vh;
}
</style>

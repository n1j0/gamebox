<script lang="ts" setup>
import { ref } from 'vue'

const wordToGuess = ref<string>('Hello')
const guessedWord = ref<string>(wordToGuess.value.replace(/./g, '*'))
const guess = ref<string>('')
const remainingGuesses = ref<number>(7)
const result = ref<string>('')

const checkCharacter = () => {
    if (remainingGuesses.value === 0) {
        return
    }

    if (guess.value.length !== 1) {
        return
    }

    const indices = []

    wordToGuess.value.split('').forEach((char, idx) => {
        if (char.toLowerCase() === guess.value.toLowerCase()) {
            indices.push(idx)
        }
    })

    if (indices.length === 0) {
        remainingGuesses.value--

        if (remainingGuesses.value === 0) {
            result.value = 'Sorry, try it again.'
        }
        return
    }

    indices.forEach(idx => {
        guessedWord.value = `${guessedWord.value.substring(0, idx)}${wordToGuess.value.charAt(idx)}${guessedWord.value.substring(idx + 1)}`
    })

    guess.value = ''

    if (!guessedWord.value.includes('*')) {
        result.value = 'Great, start over.'
    }
}

const reload = () => {
    window.location.reload()
}
</script>

<template>
    <main>
        <div v-if="!result">
            <p>Remaining guesses: {{ remainingGuesses }}</p>
            <p>{{ guessedWord }}</p>
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

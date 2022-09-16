<script lang="ts" setup>
import { useHangman } from '~/composables/useHangman'

const {
    guessedWord,
    chars,
    guess,
    remainingGuesses,
    result,
    setInitialValues,
    reload,
    checkCharacter
} = useHangman()

setInitialValues()

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
        <template v-else>
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

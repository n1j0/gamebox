<script lang="ts" setup>
import { useGames } from '~/composables/useGames'

const { games } = useGames()
</script>

<template>
    <div>
        <NuxtLink v-for="game in games" :key="game.name" :to="game.route">{{ game.name }}</NuxtLink>
    </div>
</template>

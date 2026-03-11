<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
<img src="/logo.png"/>

        <h2 class="card-title justify-center">SmartParrot Wiskunde - Aanmelden </h2>
        <form @submit.prevent="handleLogin">
          <fieldset class="fieldset">
            <label class="fieldset-label" for="naam">Naam</label>
            <input
              id="naam"
              v-model="naam"
              type="text"
              placeholder="Vul je naam in"
              class="input input-bordered w-full"
              autocomplete="name"
            />
            <p v-if="fout" class="text-error text-sm mt-1">{{ fout }}</p>
          </fieldset>

          <div class="card-actions mt-4">
            <button type="submit" class="btn btn-primary w-full">
              Aanmelden
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoginForm } from './composables/useLoginForm';

const { naam, fout, handleLogin } = useLoginForm();
</script>

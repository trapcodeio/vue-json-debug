<!--suppress VueMissingComponentImportInspection -->
<script setup lang="ts">
// Movie
const movie = {
  title: "The Matrix",
  year: 1999,
  cast: [
    {
      name: "Keanu Reeves",
      role: "Neo",
    },
    {
      name: "Laurence Fishburne",
      role: "Morpheus",
    },
    {
      name: "Carrie-Anne Moss",
      role: "Trinity",
    },
  ],
};

const song = {
  title: "All the single ladies",
  year: 2008,
  cast: [
    {
      name: "Beyonce",
      role: "Beyonce",
    },
    {
      name: "Laurence Fishburne",
      role: "Morpheus",
    },
    {
      name: "Carrie-Anne Moss",
      role: "Trinity",
    },
  ],
};
</script>

<template>
  <section>
    <Debug style="margin-top: 20px" :data="movie" name="Movie" />
    <Debug style="margin-top: 20px" :data="song" theme="dark" />
  </section>
</template>

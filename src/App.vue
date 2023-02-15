<!--suppress VueMissingComponentImportInspection -->
<script setup lang="ts">
// User Object
const user = {
  name: "John Doe",
  age: 30,
  address: {
    street: "50 Main st",
    city: "Boston",
    state: "MA",
  },
  hobbies: ["movies", "music"],
  isMarried: false,
};

// Blog Post Object
const blogPost = {
  title: "Hello World",
  body: "This is a blog post",
  comments: [
    {
      id: 1,
      body: "Great post",
      date: "2021-01-01",
    },
    {
      id: 2,
      body: "I like this post",
      date: "2021-01-02",
    },
  ],
};
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>

  <h2>vue-json-debug Demo</h2>

  <Debug style="margin-top: 20px" :data="user" name="User" />
  <Debug
    style="margin-top: 20px"
    :data="blogPost"
    theme="dark"
    name="Blog Post"
  />

  <DebugDock />

  <div style="margin-top: 50px"></div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

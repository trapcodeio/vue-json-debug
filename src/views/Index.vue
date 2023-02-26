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
  <section>
    <Debug style="margin-top: 20px" :data="user" name="User" />
    <Debug
      style="margin-top: 20px"
      :data="blogPost"
      theme="dark"
      use-parent-name
    />

    <!--    <Debug style="margin-top: 20px" :data="user" />-->
    <!--    <Debug style="margin-top: 20px" :data="blogPost" theme="dark" />-->
  </section>
</template>

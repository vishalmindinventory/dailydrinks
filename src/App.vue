<template>
  <div id="app" class="container">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <router-view class="view"></router-view>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

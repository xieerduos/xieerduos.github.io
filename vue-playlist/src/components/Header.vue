<template>
  <div class="Header">
      <h1>{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
        title:"Vue.js Demo"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
  .Header{
      background-color: lightgreen;
      padding: 10px;
  }
  h1{
      color: #222;
      text-align:center;
  }
</style>

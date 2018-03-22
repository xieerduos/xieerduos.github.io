<template>
  <div class="Footer">
      <p>{{copyright}}</p>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
        copyright:"copyright 2018 demo "
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
  .Footer{
      background-color:#222;
      padding: 10px;
  }
  p{
      color: lightgreen;
      text-align:center;
  }
</style>

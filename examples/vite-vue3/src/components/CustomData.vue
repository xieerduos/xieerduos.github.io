<script>
export default {
  name: 'CustomData',
  data() {
    return {open: false};
  },
  mounted() {
    this.open = true;
  }
};
</script>

<template>
  <div>
    <div id="modal"></div>
    <p>This is the component content</p>
    <!-- 必须先存在 #modal DOM -->
    <Teleport v-if="open" to="#modal">
      <p>This content will be rendered in the #modal element</p>
    </Teleport>
  </div>
</template>

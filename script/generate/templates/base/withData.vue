<template>
  <{{componentName}} class="{{componentName}}__withData"></{{componentName}}>
</template>

<script>
import {{humpComponentName}} from './index'
export default {
  name: '{{componentName}}__withData',
  components: {
    '{{componentName}}': {{humpComponentName}}
  }
}
</script>

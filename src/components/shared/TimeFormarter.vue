<template>
  <div>
    <span><sui-icon name="dropdown" />{{ formatDate }}</span>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  name: 'TimeFormarter',
  props: [
    'date'
  ],
  computed: {
    formatDate () {
      return moment(this.date).format('MMMM DD YYYY, h:mm:ss a')
    }
  }
}
</script>
<style>
</style>

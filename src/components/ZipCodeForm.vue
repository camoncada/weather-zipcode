<template>
  <div is="sui-container">
    <sui-segment>
      <sui-form>
        <sui-form-field>
          <input type="number" name="zipCode" id="" placeholder="Zipcode" v-model="zipCode">
          <sui-message v-if="!$v.zipCode.maxLength" icon="info circle" header="Error" content="Zipcode in not valid" color="red" size="mini"/>
        </sui-form-field>
        <sui-form-field>
          <sui-button v-if="$v.zipCode.minLength && $v.zipCode.required && $v.zipCode.maxLength" primary content="Search" icon="search" label-position="right" @click="sendZipCode"/>
        </sui-form-field>
      </sui-form>
    </sui-segment>
  </div>
</template>
<script>
import { required, minLength, maxLength} from 'vuelidate/lib/validators'
import { serverBus } from '../main.js'

export default {
  name:  'ZipCodeForm',
  data: function () {
    return {
      zipCode: ''
    }
  },
  validations: {
    zipCode: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(5)
    }
  },
  props: ['server'],
  methods: {
    sendZipCode (e) {
      serverBus.$emit('sendZipCode', this.zipCode)
      e.preventDefault()
    }
  }
}
</script>
<style>

</style>

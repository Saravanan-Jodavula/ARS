<template>
  <va-card :key="flag" :title="$t('Live Data')">
    <div class="row">
      <va-card class="flex md5 xs12 lg5 ma-1" width="90" :title="$t('Upper Quadrant - 1')" >
        <h1>Times Taken:</h1>
        <p v-for="i in upperQuadrant" :key="i">{{i}}</p>
      </va-card>
      <va-card class="flex md5 xs12 lg5 ma-1" width="90" :title="$t('Upper Quadrant - 2')" >
        <h1>Times Taken:</h1>
        <p v-for="i in upperQuadrant" :key="i">{{i}}</p>
      </va-card>
    </div>
    <div class="row">
      <va-card class="flex md5 xs12 lg5 ma-1" width="90" :title="$t('Diagonal - 1')" >
        <h1>Times Taken:</h1>
        <p v-for="i in upperQuadrant" :key="i">{{i}}</p>
      </va-card>
      <va-card class="flex md5 xs12 lg5 ma-1" width="90" :title="$t('diagonal - 2')" >
        <h1>Times Taken:</h1>
        <p v-for="i in upperQuadrant" :key="i">{{i}}</p>
      </va-card>
    </div>
    <div class="row">
      <va-card class="flex md5 xs12 lg5 ma-1" width="90" :title="$t('sideways - 1')" >
        <h1>Times Taken:</h1>
        <p v-for="i in upperQuadrant" :key="i">{{i}}</p>
      </va-card>
      <va-card class="flex md5 xs12 lg5 ma-1" width="90" :title="$t('sideways - 2')" >
        <h1>Times Taken:</h1>
        <p v-for="i in upperQuadrant" :key="i">{{i}}</p>
      </va-card>
    </div>
    <div class="row">
      <va-card class="flex md5 xs12 lg5 ma-1" width="90" :title="$t('Lower Quadrant - 1')" >
        <h1>Times Taken:</h1>
        <p v-for="i in upperQuadrant" :key="i">{{i}}</p>
      </va-card>
      <va-card class="flex md5 xs12 lg5 ma-1" width="90" :title="$t('Lower Quadrant - 2')" >
        <h1>Times Taken:</h1>
        <p v-for="i in upperQuadrant" :key="i">{{i}}</p>
      </va-card>
    </div>
  </va-card>
</template>

<script>
import io from 'socket.io-client'
var socket = io.connect('http://208.117.82.169:8000')
export default {
  name: 'app',
  data () {
    return {
      upperQuadrant: [],
      lowerQuadrant: [],
      sideways: [],
      diagonal: [],
      flag: false,
    }
  },
  created () {
    console.log('created')
    let len = 0
    socket.on('newdata', fetchedData => {
      if (fetchedData.upperQuadrant.length > len) {
        len = fetchedData.upperQuadrant.length
        this.fillData(fetchedData)
      }
    })
  },
  methods: {

    fillData (fetchedData) {
      this.upperQuadrant = fetchedData.upperQuadrant
      this.lowerQuadrant = fetchedData.lowerQuadrant
      this.sideways = fetchedData.sideways
      this.diagonal = fetchedData.diagonal
      this.flag = !this.flag
      console.log('hi', fetchedData)
    },
  },
}
</script>

<template>
  <div class="play_wrap">
    <audio :src="audioPath" ref="audio" autoplay @playing="playListener" @canplay="eventCanPlay" @ended="eventEnd" @error="eventErr"></audio>
  </div>
</template>
<script>
export default {
  name: 'sAudio',
  model: {
    prop: 'active',
    event: 'change'
  },
  props: {
    active: {
      type: Object,
      default: () => {
        return {
          id:'',
          numb: 0,
          onPlay: false
        }
      }
    },
    audios: {
      type: Array
    },
    autoNext: {
      type: Boolean,
      default: true
    },
    errTip:{
      type: Object,
      default: () => {
        return {
          ignore: true,
          tip: ''
        }
      }
    }
  },
  data() {
    return {
      audioPath: '',
      current: 0,
      canplay: false,
      onPlay: false
    }
  },
  watch: {
    audios: function(val) {
      this.current = this.active.numb
      this.audioPath = this.audios[this.current]
      if(this.autoNext) {
        this.play()
      }
    },
    audioPath: function(newVal, oldVal) {
      this.canplay = !oldVal
    },
    current: function(val) {
      this.active.numb = val
      this.$emit('change', this.active)
    },
    active: function(val) {
      this.current = val.numb
    },
    onPlay: function(val) {
      // console.log(val)
      this.active.onPlay = val
      this.$emit('change', this.active)
    }
  },
  mounted() {
    this.current = this.active
    this.audioPath = this.audios[this.current]
  },
  methods: {
    eventCanPlay() {
      this.$refs.audio.play()
      this.canplay = true
    },
    eventEnd() {
      if(this.current >= this.audios.length){
        this.$emit('ended')
        this.current = 0
        this.onPlay = false
        return
      }
      this.next()
    },
    eventErr() {
      !!this.errTip && this.next()
      this.$emit('error')
    },
    play() {
      // console.log('play')
      this.$refs.audio.play()
      this.onPlay = true
    },
    pause() {
      // console.log('pause')
      this.canplay && this.$refs.audio.pause()
      this.onPlay = false
    },
    next() {
      this.current ++
      this.audioPath = this.audios[this.current]
      this.play()
      this.$emit('next')
    },
    prev() {
      this.current--
      if(this.current<=0){
        this.current = 0
        this.$emit('init')
      }
    },
    playListener() {
      this.$emit('playing')
    }
  }
}
</script>
<style lang="less" scoped>
  
</style>
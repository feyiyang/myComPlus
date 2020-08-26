import sAudio from './audioPlayer'

sAudio.install = Vue => Vue.component(sAudio.name, sAudio)

export default sAudio
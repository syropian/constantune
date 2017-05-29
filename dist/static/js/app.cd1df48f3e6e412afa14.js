webpackJsonp([2,0],[function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var s=a(36),n=r(s),i=a(93),c=r(i),o=a(39),l=r(o);window.SOUNDCLOUD_API_KEY="781f5b35a83b232906c2f9f28164d5a5",new n.default({el:"#app",store:l.default,render:function(t){return t(c.default)}})},,,,,,,,,,,,,,,,,,,,,function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(35);e.default={computed:{currentTrackIndex:function(){var t=this;return(0,r.findIndex)(this.tracks,function(e){return e.id===t.currentTrack.id})}},methods:{playingAndCurrentTrack:function(t){return"PLAYING"===this.playback.playState&&t.id===this.currentTrack.id},playingOrPausedAndNotCurrentTrack:function(t){return"IDLE"!==this.playback.playState&&t.id!==this.currentTrack.id},playTrack:function(t){var e=this;return t.streamable?("IDLE"===this.playback.playState?(this.setPlayState("PLAYING"),this.player.play({streamUrl:t.stream_url})):this.playingAndCurrentTrack(t)?(this.setPlayState("PAUSED"),this.player.pause()):this.playingOrPausedAndNotCurrentTrack(t)?(this.setPlayState("PLAYING"),this.player.play({streamUrl:t.stream_url})):(this.setPlayState("PLAYING"),this.player.play({streamUrl:t.stream_url})),setTimeout(function(){e.setCurrentTrack(t)},0),this.player.on("ended",function(){e.nextTrack()}),void this.player.on("timeupdate",function(){e.setTrackProgress(e.player.audio.currentTime)})):(this.player.stop(),this.setPlayState("IDLE"),this.setCurrentTrack({}),window.alert("Sorry, this track is not streamable."),!1)},playTrackAtIndex:function(t){return t===-1?(this.setPlayState("IDLE"),!1):void this.playTrack(this.tracks[t])},nextTrack:function t(){var e=this,a=void 0;switch(this.playback.repeatState){case"OFF":a=this.currentTrackIndex===this.tracks.length-1?-1:this.currentTrackIndex+1;break;case"ON":a=this.currentTrackIndex===this.tracks.length-1?0:this.currentTrackIndex+1;break;case"ONE":a=this.currentTrackIndex}var t=this.tracks[a];return t.streamable?(this.player.stop(),this.setPlayState("PLAYING"),this.player.play({streamUrl:t.stream_url}),void setTimeout(function(){e.setCurrentTrack(t)},0)):(this.player.stop(),this.setPlayState("IDLE"),this.setCurrentTrack({}),window.alert("Sorry, this track is not streamable."),!1)},prevTrack:function t(){var e=this,a=void 0;switch(this.playback.repeatState){case"OFF":a=0===this.currentTrackIndex?0:this.currentTrackIndex-1;break;case"ON":a=0===this.currentTrackIndex?0:this.currentTrackIndex-1;break;case"ONE":a=this.currentTrackIndex}var t=this.tracks[a];return t.streamable?(this.player.stop(),this.setPlayState("PLAYING"),this.player.play({streamUrl:t.stream_url}),void setTimeout(function(){e.setCurrentTrack(t)},0)):(this.player.stop(),this.setPlayState("IDLE"),this.setCurrentTrack({}),window.alert("Sorry, this track is not streamable."),!1)},pauseTrack:function(){this.setPlayState("PAUSED"),this.player.pause()},unpauseTrack:function(){this.setPlayState("PLAYING"),this.player.play({streamUrl:this.currentTrack.stream_url})}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.SET_CURRENT_TRACK="SET_CURRENT_TRACK",e.SET_TRACKS="SET_TRACKS",e.ADD_TRACK="ADD_TRACK",e.REMOVE_TRACK="REMOVE_TRACK",e.SET_PLAYER="SET_PLAYER",e.SET_PROGRESS="SET_PROGRESS",e.SET_PLAY_STATE="SET_PLAY_STATE",e.SET_REPEAT_STATE="SET_REPEAT_STATE",e.SET_VOLUME="SET_VOLUME"},,,,,,,,,,,,,,,,function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={mounted:function(){var t=this;document.addEventListener("keyup",function(e){if(t.tracks.length)switch(e.keyCode){case 40:t.nextTrack();break;case 38:t.prevTrack();break;case 32:"IDLE"===t.playback.playState?t.playTrackAtIndex(0):"PLAYING"===t.playback.playState?t.pauseTrack():t.unpauseTrack();break;case 82:t.setRepeatState();break;case 83:t.shuffleTracks()}},!1)}}},function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s=a(36),n=r(s),i=a(3),c=r(i),o=a(41),l=r(o),u=a(40),d=r(u),p=a(105),f=r(p);n.default.use(c.default),e.default=new c.default.Store({plugins:[(0,f.default)({key:"constantune",paths:["tracks.tracks","playback.repeatState"]})],modules:{tracks:l.default,playback:d.default}})},function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s,n=a(23),i=r(n),c=a(22),o={player:null,progress:0,playState:"IDLE",repeatState:"ON",shuffleState:"OFF",volume:50},l={player:function(t){return t.player}},u={setPlayer:function(t,e){var a=t.commit;a(c.SET_PLAYER,e)},setPlayState:function(t,e){var a=t.commit;a(c.SET_PLAY_STATE,e)},setTrackProgress:function(t,e){var a=t.commit;a(c.SET_PROGRESS,e)},setRepeatState:function(t){var e=t.commit,a=t.state,r=void 0;switch(a.repeatState){case"OFF":r="ON";break;case"ON":r="ONE";break;case"ONE":r="OFF"}e(c.SET_REPEAT_STATE,r)}},d=(s={},(0,i.default)(s,c.SET_PLAYER,function(t,e){t.player=e}),(0,i.default)(s,c.SET_PROGRESS,function(t,e){t.progress=e}),(0,i.default)(s,c.SET_PLAY_STATE,function(t,e){t.playState=e}),(0,i.default)(s,c.SET_REPEAT_STATE,function(t,e){t.repeatState=e}),(0,i.default)(s,c.SET_VOLUME,function(t,e){t.volume=e}),s);e.default={state:o,getters:l,actions:u,mutations:d}},function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s,n=a(23),i=r(n),c=a(82),o=a(22),l=a(35),u={currentTrack:{},tracks:[]},d={currentTrack:function(t){return t.currentTrack},tracks:function(t){return t.tracks}},p={addTrack:function(t,e){var a=t.commit;return new c.Promise(function(t,r){a(o.ADD_TRACK,e),t()})},removeTrack:function(t,e){var a=t.commit;return new c.Promise(function(t,r){a(o.REMOVE_TRACK,e),t()})},setTracks:function(t,e){var a=t.commit;return new c.Promise(function(t,r){a(o.SET_TRACKS,e),t()})},setCurrentTrack:function(t,e){var a=t.commit;a(o.SET_CURRENT_TRACK,e)},shuffleTracks:function(t){var e=t.commit,a=t.state;e(o.SET_TRACKS,(0,l.shuffle)(a.tracks))}},f=(s={},(0,i.default)(s,o.SET_CURRENT_TRACK,function(t,e){t.currentTrack=e}),(0,i.default)(s,o.SET_TRACKS,function(t,e){t.tracks=e}),(0,i.default)(s,o.ADD_TRACK,function(t,e){(0,l.isArray)(e)?t.tracks=t.tracks.concat(e):t.tracks=t.tracks.concat([e])}),(0,i.default)(s,o.REMOVE_TRACK,function(t,e){t.tracks.splice(e,1)}),s);e.default={state:u,getters:d,actions:p,mutations:f}},function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s=a(4),n=r(s),i=a(92),c=r(i),o=a(3),l=a(94),u=r(l),d=a(96),p=r(d),f=a(97),k=r(f),y=a(98),h=r(y);e.default={name:"App",data:function(){return{url:"",badTracks:[],aboutShowing:!1}},computed:(0,n.default)({},(0,o.mapState)(["playback"]),(0,o.mapGetters)(["tracks","player"])),methods:(0,n.default)({},(0,o.mapActions)(["addTrack","setPlayer"]),{addNewTrackFromUrl:function(){var t=this;this.badTracks=[],this.player.resolve(this.url,function(e){if(e.hasOwnProperty("tracks")){var a=e.tracks.filter(function(t){return t.streamable});t.badTracks=e.tracks.filter(function(t){return!t.streamable}).map(function(t){return t.title}),t.addTrack(a)}else e.streamable?t.addTrack(e):t.badTracks.push(e.title);t.url=""})}}),mounted:function(){this.setPlayer(new c.default(window.SOUNDCLOUD_API_KEY))},components:{AboutPanel:u.default,PlaybackControls:p.default,Playlist:k.default,Visualizer:h.default}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"AboutPanel",props:["visible"],methods:{hide:function(){this.$emit("hide")}}}},function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s=a(4),n=r(s),i=a(3);e.default={name:"audio-track",props:["track","playstate","index"],computed:(0,n.default)({},(0,i.mapGetters)(["currentTrack","tracks","player"]),{isCurrentTrack:function(){return this.track.id===this.currentTrack.id}}),methods:(0,n.default)({},(0,i.mapActions)(["setCurrentTrack","removeTrack","setPlayState"]),{doRemoveTrack:function(t){this.tracks[t].id===this.currentTrack.id&&(this.player.stop(),this.setPlayState("IDLE"),this.setCurrentTrack({})),this.removeTrack(t)}})}},function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s=a(4),n=r(s),i=a(3),c=a(38),o=r(c),l=a(21),u=r(l);e.default={mixins:[o.default,u.default],computed:(0,n.default)({},(0,i.mapState)(["playback"]),(0,i.mapGetters)(["currentTrack","tracks","player"]),{currentTrackDuration:function(){return this.currentTrack.duration/1e3}}),methods:(0,n.default)({},(0,i.mapActions)(["setPlayState","setCurrentTrack","setRepeatState","setTrackProgress","shuffleTracks"]),{doPlayTrack:function(){"IDLE"===this.playback.playState?this.playTrackAtIndex(0):"PLAYING"===this.playback.playState?this.pauseTrack():this.unpauseTrack()},seek:function(t){this.player.seek(t)}})}},function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s=a(4),n=r(s),i=a(3),c=a(21),o=r(c),l=a(95),u=r(l),d=a(91),p=r(d);e.default={name:"Playlist",props:["tracks"],mixins:[o.default],mounted:function(){var t=this;p.default.create(this.$refs.playlist,{animation:150,delay:150,onUpdate:function(e){var a=e.oldIndex,r=e.newIndex,s=a,n=r;t.tracks.splice(n,0,t.tracks.splice(s,1)[0]),setTimeout(function(){t.setTracks(t.tracks)},0)}})},computed:(0,n.default)({},(0,i.mapState)(["playback"]),(0,i.mapGetters)(["currentTrack","player"])),methods:(0,n.default)({},(0,i.mapActions)(["setCurrentTrack","setTracks","setPlayState","setTrackProgress"])),components:{AudioTrack:u.default}}},function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s=a(48),n=r(s),i=a(4),c=r(i),o=a(3);e.default={props:["binCount","smoothing"],data:function(){return{playerHasBeenInit:!1,analyserNode:null,frequencyByteData:new Uint8Array(this.binCount),streamData:[]}},computed:(0,c.default)({},(0,o.mapGetters)(["player"])),watch:{player:function(t){var e=this;this.player.audio.crossOrigin="anonymous",this.player.on("playing",function(){e.playerHasBeenInit||e.initAudioAnalyser(),e.playerHasBeenInit=!0},0)}},methods:{initAudioAnalyser:function(){var t=new(window.AudioContext||window.webkitAudioContext),e=t.createMediaElementSource(this.player.audio);this.analyserNode=t.createAnalyser(),this.analyserNode.fftSize=2*this.binCount,this.analyserNode.smoothingTimeConstant=this.smoothing,e.connect(this.analyserNode),this.analyserNode.connect(t.destination),this.initDataStream()},updateSample:function(){this.analyserNode.getByteFrequencyData(this.frequencyByteData),this.streamData=(0,n.default)(this.frequencyByteData)},initDataStream:function(){this.updateSample(),window.requestAnimationFrame(this.initDataStream)}}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,,,function(t,e,a){a(85);var r=a(2)(a(42),a(101),null,null);t.exports=r.exports},function(t,e,a){a(87);var r=a(2)(a(43),a(103),null,null);t.exports=r.exports},function(t,e,a){a(86);var r=a(2)(a(44),a(102),null,null);t.exports=r.exports},function(t,e,a){a(83);var r=a(2)(a(45),a(99),null,null);t.exports=r.exports},function(t,e,a){a(84);var r=a(2)(a(46),a(100),null,null);t.exports=r.exports},function(t,e,a){a(88);var r=a(2)(a(47),a(104),null,null);t.exports=r.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"playback-controls"},[a("div",{staticClass:"playback-control prev fa fa-backward",on:{click:t.prevTrack}}),t._v(" "),a("div",{staticClass:"playback-control playPause fa",class:{"fa-play":"PAUSED"==t.playback.playState||"IDLE"==t.playback.playState,"fa-pause":"PLAYING"==t.playback.playState},on:{click:t.doPlayTrack}}),t._v(" "),a("div",{staticClass:"playback-control next fa fa-forward",on:{click:t.nextTrack}}),t._v(" "),a("div",{staticClass:"playback-control repeat fa fa-refresh",class:"repeat-"+t.playback.repeatState.toLowerCase(),on:{click:t.setRepeatState}}),t._v(" "),a("div",{staticClass:"track-progress-container"},[a("progress",{staticClass:"track-progress",attrs:{max:t.currentTrackDuration,value:t.playback.progress},on:{click:t.seek}})])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",{ref:"playlist",staticClass:"playlist",on:{keydown:function(t){t.preventDefault()}}},t._l(t.tracks,function(e,r){return a("audio-track",{key:e.id,attrs:{track:e,playstate:t.playback.playState,index:r},nativeOn:{click:function(a){t.playTrack(e)}}})}))},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("about-panel",{attrs:{visible:t.aboutShowing},on:{hide:function(e){t.aboutShowing=!1}}}),t._v(" "),a("visualizer",{attrs:{"bin-count":128,smoothing:.8}}),t._v(" "),t._m(0),t._v(" "),a("div",{staticClass:"main"},[a("div",{staticClass:"header-bar"},[a("form",{staticClass:"addTrackForm",on:{submit:function(e){e.preventDefault(),t.addNewTrackFromUrl(e)}}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.url,expression:"url"}],attrs:{type:"text",placeholder:"Enter a SoundCloud Track or Playlist URL"},domProps:{value:t.url},on:{keyup:function(t){t.stopPropagation()},input:function(e){e.target.composing||(t.url=e.target.value)}}})])]),t._v(" "),t.tracks.length?a("div",{staticClass:"playback-controls-container"},[a("playback-controls")],1):t._e(),t._v(" "),a("div",{staticClass:"playlist-container"},[t.badTracks.length?a("div",{staticClass:"track-errors"},[a("div",{staticClass:"track-errors-hide",on:{click:function(e){t.badTracks=[]}}},[t._v("×")]),t._v(" "),a("div",{staticClass:"track-errors-message"},[a("p",[t._v("The following tracks were unable to be added because they are not streamable:")]),t._v(" "),a("ul",t._l(t.badTracks,function(e){return a("li",[t._v(t._s(e))])}))])]):t._e(),t._v(" "),a("playlist",{attrs:{tracks:t.tracks}})],1)]),t._v(" "),a("div",{staticClass:"footer"},[t._m(1),t._v(" "),a("div",{staticClass:"footer-links"},[t._m(2),t._v(" "),a("a",{attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.aboutShowing=!0}}},[t._v("About")]),t._v(" "),a("a",{attrs:{href:"https://github.com/syropian/constantune",target:"_blank",rel:"noopener"}},[t._v("GitHub")])])])],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"logo"},[a("img",{attrs:{src:"static/images/logo.svg",alt:"Constatune"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a",{attrs:{href:"https://soundcloud.com",target:"_blank",rel:"noopener"}},[a("img",{attrs:{src:"static/images/sc.png",alt:"Powered by SoundCloud",width:"52",height:"16"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"footer-author"},[t._v("A project by "),a("a",{attrs:{href:"http://syropia.net",target:"_blank",rel:"noopener"}},[t._v("Syropia")]),t._v(".")])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"track",class:{active:t.isCurrentTrack,"not-streamable":!t.track.streamable}},[t.track.streamable?t._e():a("div",{staticClass:"track-state",attrs:{title:"This track is not streamable"}},[a("i",{staticClass:"fa fa-warning"})]),t._v(" "),t.isCurrentTrack?a("div",{staticClass:"track-state"},[a("i",{staticClass:"fa",class:{"fa-play":"PAUSED"==t.playstate,"fa-pause":"PLAYING"==t.playstate}})]):t._e(),t._v(" "),a("div",{staticClass:"track-name"},[t._v(t._s(t.track.title))]),t._v(" "),a("div",{staticClass:"remove-track",on:{click:function(e){e.stopPropagation(),t.doRemoveTrack(t.index)}}},[t._v("×")])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"about-wrapper",class:{active:t.visible},on:{click:function(e){return e.target!==e.currentTarget?null:void t.hide(e)}}},[t._m(0)])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"about-container"},[a("h3",[t._v("What is Constantune?")]),t._v(" "),a("p",[t._v("Constantune is a simple, loopable playlist builder for SoundCloud tracks. Simply paste a SoundCloud track or playlist URL, build your playlist, and let it loop.")]),t._v(" "),a("h3",[t._v("Why?")]),t._v(" "),a("p",[t._v("Constantune is a side project built out of frustration that I couldn't simply loop a track, or series of tracks on SoundCloud. Hopefully you find it useful as well.")]),t._v(" "),a("h3",[t._v("Who Built It?")]),t._v(" "),a("p",[t._v("Hi! I'm Collin Henderson, front-end developer at "),a("a",{attrs:{href:"http://format.com",target:"_blank",rel:"noopener"}},[t._v("Format")]),t._v(", and creator of "),a("a",{attrs:{href:"https://astralapp.com",target:"_blank",rel:"noopener"}},[t._v("Astral")]),t._v(". I'm "),a("a",{attrs:{href:"http://twitter.com/syropian",target:"_blank",rel:"noopener"}},[t._v("@syropian")]),t._v(" on Twitter.")]),t._v(" "),a("h3",[t._v("Nerdy Stuff")]),t._v(" "),a("p",[t._v("Constantune is built with "),a("a",{attrs:{href:"https://vuejs.org/",target:"_blank",rel:"noopener"}},[t._v("Vue.js")]),t._v(". It uses the SoundCloud API for track information & streaming, HTML5 Audio API for visualizations, and HTML5 LocalStorage to persist your playlists.")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"lines"},t._l(t.streamData,function(t,e){return a("div",{staticClass:"line",style:{height:t+"px"}})}))},staticRenderFns:[]}},,,function(t,e){}]);
//# sourceMappingURL=app.cd1df48f3e6e412afa14.js.map
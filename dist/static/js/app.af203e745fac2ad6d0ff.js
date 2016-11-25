webpackJsonp([2,0],[function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var n=a(19),s=r(n),c=a(67),u=r(c),i=a(21),o=r(i);new s.default({el:"#app",store:o.default,render:function(t){return t(u.default)}})},,,,,,,,function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(18);e.default={computed:{currentTrackIndex:function(){var t=this;return(0,r.findIndex)(this.tracks,function(e){return e.id===t.currentTrack.id})}},methods:{playingAndCurrentTrack:function(t){return"PLAYING"===this.playback.playState&&t.id===this.currentTrack.id},playingOrPausedAndNotCurrentTrack:function(t){return"IDLE"!==this.playback.playState&&t.id!==this.currentTrack.id},playTrack:function(t){var e=this;"IDLE"===this.playback.playState?(this.setPlayState("PLAYING"),this.player.play({streamUrl:t.stream_url})):this.playingAndCurrentTrack(t)?(this.setPlayState("PAUSED"),this.player.pause()):this.playingOrPausedAndNotCurrentTrack(t)?(this.setPlayState("PLAYING"),this.player.play({streamUrl:t.stream_url})):(this.setPlayState("PLAYING"),this.player.play({streamUrl:t.stream_url})),setTimeout(function(){e.setCurrentTrack(t)},0),this.player.on("ended",function(){e.nextTrack()}),this.player.on("timeupdate",function(){e.setTrackProgress(e.player.audio.currentTime)})},playTrackAtIndex:function(t){return t===-1?(this.setPlayState("IDLE"),!1):void this.playTrack(this.tracks[t])},nextTrack:function t(){var e=this,a=void 0;switch(this.playback.repeatState){case"OFF":a=this.currentTrackIndex===this.tracks.length-1?-1:this.currentTrackIndex+1;break;case"ON":a=this.currentTrackIndex===this.tracks.length-1?0:this.currentTrackIndex+1;break;case"ONE":a=this.currentTrackIndex}var t=this.tracks[a];this.player.stop(),this.setPlayState("PLAYING"),this.player.play({streamUrl:t.stream_url}),setTimeout(function(){e.setCurrentTrack(t)},0)},prevTrack:function t(){var e=this,a=void 0;switch(this.playback.repeatState){case"OFF":a=0===this.currentTrackIndex?0:this.currentTrackIndex-1;break;case"ON":a=0===this.currentTrackIndex?0:this.currentTrackIndex-1;break;case"ONE":a=this.currentTrackIndex}var t=this.tracks[a];this.player.stop(),this.setPlayState("PLAYING"),this.player.play({streamUrl:t.stream_url}),setTimeout(function(){e.setCurrentTrack(t)},0)},pauseTrack:function(){this.setPlayState("PAUSED"),this.player.pause()},unpauseTrack:function(){this.setPlayState("PLAYING"),this.player.play({streamUrl:this.currentTrack.stream_url})}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.SET_CURRENT_TRACK="SET_CURRENT_TRACK",e.SET_TRACKS="SET_TRACKS",e.ADD_TRACK="ADD_TRACK",e.SET_PLAYER="SET_PLAYER",e.SET_PROGRESS="SET_PROGRESS",e.SET_PLAY_STATE="SET_PLAY_STATE",e.SET_REPEAT_STATE="SET_REPEAT_STATE",e.SET_SHUFFLE_STATE="SET_SHUFFLE_STATE",e.SET_VOLUME="SET_VOLUME"},,,,,,,,,,,function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={mounted:function(){var t=this;document.addEventListener("keyup",function(e){switch(e.keyCode){case 40:t.nextTrack();break;case 38:t.prevTrack();break;case 32:"IDLE"===t.playback.playState?t.playTrackAtIndex(0):"PLAYING"===t.playback.playState?t.pauseTrack():t.unpauseTrack();break;case 82:t.setRepeatState()}},!1)}}},function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(19),s=r(n),c=a(1),u=r(c),i=a(23),o=r(i),l=a(22),f=r(l);s.default.use(u.default),e.default=new u.default.Store({modules:{tracks:o.default,playback:f.default}})},function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n,s=a(10),c=r(s),u=a(9),i={player:null,progress:0,playState:"IDLE",repeatState:"OFF",shuffleState:"OFF",volume:50},o={player:function(t){return t.player}},l={setPlayer:function(t,e){var a=t.commit;a(u.SET_PLAYER,e)},setPlayState:function(t,e){var a=t.commit;a(u.SET_PLAY_STATE,e)},setTrackProgress:function(t,e){var a=t.commit;a(u.SET_PROGRESS,e)},setShuffleState:function(t,e){var a=t.commit;a(u.SET_SHUFFLE_STATE,e)},setRepeatState:function(t){var e=t.commit,a=t.state,r=void 0;switch(a.repeatState){case"OFF":r="ON";break;case"ON":r="ONE";break;case"ONE":r="OFF"}e(u.SET_REPEAT_STATE,r)}},f=(n={},(0,c.default)(n,u.SET_PLAYER,function(t,e){t.player=e}),(0,c.default)(n,u.SET_PROGRESS,function(t,e){t.progress=e}),(0,c.default)(n,u.SET_PLAY_STATE,function(t,e){t.playState=e}),(0,c.default)(n,u.SET_REPEAT_STATE,function(t,e){t.repeatState=e}),(0,c.default)(n,u.SET_SHUFFLE_STATE,function(t,e){t.shuffleState=e}),(0,c.default)(n,u.SET_VOLUME,function(t,e){t.volume=e}),n);e.default={state:i,getters:o,actions:l,mutations:f}},function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n,s=a(10),c=r(s),u=a(57),i=a(9),o=a(18),l={currentTrack:{},tracks:[]},f={currentTrack:function(t){return t.currentTrack},tracks:function(t){return t.tracks}},d={addTrack:function(t,e){var a=t.commit;t.state;return new u.Promise(function(t,r){a(i.ADD_TRACK,e),t()})},setTracks:function(t,e){var a=t.commit;return new u.Promise(function(t,r){a(i.SET_TRACKS,e),t()})},setCurrentTrack:function(t,e){var a=t.commit;a(i.SET_CURRENT_TRACK,e)}},p=(n={},(0,c.default)(n,i.SET_CURRENT_TRACK,function(t,e){t.currentTrack=e}),(0,c.default)(n,i.SET_TRACKS,function(t,e){t.tracks=e}),(0,c.default)(n,i.ADD_TRACK,function(t,e){(0,o.isArray)(e)?t.tracks=t.tracks.concat(e):t.tracks=t.tracks.concat([e])}),n);e.default={state:l,getters:f,actions:d,mutations:p}},function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(2),s=r(n),c=a(66),u=r(c),i=a(17),o=r(i),l=a(1),f=a(69),d=r(f),p=a(70),k=r(p);e.default={data:function(){return{url:""}},computed:(0,s.default)({},(0,l.mapState)(["playback"]),(0,l.mapGetters)(["tracks","player"])),methods:(0,s.default)({},(0,l.mapActions)(["addTrack","setPlayer"]),{addNewTrackFromUrl:function(){var t=this;this.player.resolve(this.url,function(e){e.hasOwnProperty("tracks")?t.addTrack(e.tracks).then(function(){(0,o.default)("tracks",t.tracks)}):t.addTrack(e).then(function(){(0,o.default)("tracks",t.tracks)}),t.url=""})}}),mounted:function(){this.setPlayer(new u.default("781f5b35a83b232906c2f9f28164d5a5")),(0,o.default)("tracks")&&this.addTrack((0,o.default)("tracks"))},components:{PlaybackControls:d.default,Playlist:k.default}}},function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(2),s=r(n),c=a(1);e.default={name:"audio-track",props:["track","playstate"],computed:(0,s.default)({},(0,c.mapGetters)(["currentTrack"]),{isCurrentTrack:function(){return this.track.id===this.currentTrack.id}})}},function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(2),s=r(n),c=a(1),u=a(20),i=r(u),o=a(8),l=r(o);e.default={mixins:[i.default,l.default],computed:(0,s.default)({},(0,c.mapState)(["playback"]),(0,c.mapGetters)(["currentTrack","tracks","player"]),{currentTrackDuration:function(){return this.currentTrack.duration/1e3}}),methods:(0,s.default)({},(0,c.mapActions)(["setPlayState","setCurrentTrack","setShuffleState","setRepeatState"]),{playTrack:function(){"IDLE"===this.playback.playState?this.playTrackAtIndex(0):"PLAYING"===this.playback.playState?this.pauseTrack():this.unpauseTrack()},seek:function(t){this.player.seek(t)},toggleShuffleState:function(){"ON"===this.playback.shuffleState?this.setShuffleState("OFF"):this.setShuffleState("ON")}})}},function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(2),s=r(n),c=a(1),u=a(8),i=r(u),o=a(68),l=r(o),f=a(17),d=r(f),p=a(65),k=r(p);e.default={name:"Playlist",props:["tracks"],mixins:[i.default],mounted:function(){var t=this;k.default.create(this.$refs.playlist,{animation:150,delay:150,onUpdate:function(e){var a=e.oldIndex,r=e.newIndex,n=a,s=r;t.tracks.splice(s,0,t.tracks.splice(n,1)[0]),setTimeout(function(){t.setTracks(t.tracks).then(function(){(0,d.default)("tracks",t.tracks)})},0)}})},computed:(0,s.default)({},(0,c.mapState)(["playback"]),(0,c.mapGetters)(["currentTrack","player"])),methods:(0,s.default)({},(0,c.mapActions)(["setCurrentTrack","setTracks","setPlayState","setTrackProgress"])),components:{AudioTrack:l.default}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,,,,function(t,e,a){var r,n;a(61),r=a(24);var s=a(74);n=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(n=r=r.default),"function"==typeof n&&(n=n.options),n.render=s.render,n.staticRenderFns=s.staticRenderFns,t.exports=r},function(t,e,a){var r,n;a(59),r=a(25);var s=a(72);n=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(n=r=r.default),"function"==typeof n&&(n=n.options),n.render=s.render,n.staticRenderFns=s.staticRenderFns,t.exports=r},function(t,e,a){var r,n;a(60),r=a(26);var s=a(73);n=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(n=r=r.default),"function"==typeof n&&(n=n.options),n.render=s.render,n.staticRenderFns=s.staticRenderFns,t.exports=r},function(t,e,a){var r,n;a(58),r=a(27);var s=a(71);n=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(n=r=r.default),"function"==typeof n&&(n=n.options),n.render=s.render,n.staticRenderFns=s.staticRenderFns,t.exports=r},function(t,e){t.exports={render:function(){var t=this;return t._h("ul",{ref:"playlist",staticClass:"playlist",on:{keydown:function(t){t.preventDefault()}}},[t._l(t.tracks,function(e){return t._h("audio-track",{key:e.id,attrs:{track:e,playstate:t.playback.playState},nativeOn:{click:function(a){t.playTrack(e)}}})})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this;return t._h("li",{staticClass:"track",class:{active:t.isCurrentTrack}},[t.isCurrentTrack?t._h("div",{staticClass:"track-state"},[t._h("i",{staticClass:"fa",class:{"fa-play":"PAUSED"==t.playstate,"fa-pause":"PLAYING"==t.playstate}})]):t._e()," ",t._h("div",{staticClass:"track-name"},[t._s(t.track.title)])," "])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this;return t._h("div",{staticClass:"playback-controls"},[t._h("div",{staticClass:"playback-control prev fa fa-backward",on:{click:t.prevTrack}})," ",t._h("div",{staticClass:"playback-control playPause fa",class:{"fa-play":"PAUSED"==t.playback.playState||"IDLE"==t.playback.playState,"fa-pause":"PLAYING"==t.playback.playState},on:{click:t.playTrack}})," ",t._h("div",{staticClass:"playback-control next fa fa-forward",on:{click:t.nextTrack}})," "," ",t._h("div",{staticClass:"playback-control repeat fa fa-repeat",class:"repeat-"+t.playback.repeatState.toLowerCase(),on:{click:t.setRepeatState}})," ",t._h("progress",{staticClass:"track-progress",attrs:{max:t.currentTrackDuration,value:t.playback.progress},on:{click:t.seek}})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this;return t._h("div",{attrs:{id:"app"}},[t._m(0)," ",t._h("div",{staticClass:"main"},[t._h("div",{staticClass:"header-bar"},[t._h("form",{staticClass:"addTrackForm",on:{submit:function(e){e.preventDefault(),t.addNewTrackFromUrl(e)}}},[t._h("input",{directives:[{name:"model",rawName:"v-model",value:t.url,expression:"url"}],attrs:{type:"text",placeholder:"SoundCloud URL"},domProps:{value:t._s(t.url)},on:{keyup:function(t){t.stopPropagation()},input:function(e){e.target.composing||(t.url=e.target.value)}}})])," "])," ",t._h("div",{staticClass:"playback-controls-container"},[t._h("playback-controls")])," ",t._h("div",{staticClass:"playlist-container"},[t._h("playlist",{attrs:{tracks:t.tracks}})])])," ",t._m(1)])},staticRenderFns:[function(){var t=this;return t._h("div",{staticClass:"logo"},[t._h("img",{attrs:{src:"static/images/logo.svg",alt:"Constatune"}})])},function(){var t=this;return t._h("div",{staticClass:"footer"},[t._h("a",{attrs:{href:"https://soundcloud.com",target:"_blank",rel:"noopener"}},[t._h("img",{attrs:{src:"static/images/sc.png",alt:"Powered by SoundCloud",width:"52",height:"16"}})])," ",t._h("div",{staticClass:"footer-links"},[t._h("div",{staticClass:"footer-author"},["A project by ",t._h("a",{attrs:{href:"http://syropia.net",target:"_blank",rel:"noopener"}},["Syropia"]),"."])," ",t._h("a",{attrs:{href:"#"}},["About"])," ",t._h("a",{attrs:{href:"https://github.com/syropian/constantune",target:"_blank",rel:"noopener"}},["GitHub"])])])}]}},,function(t,e){}]);
//# sourceMappingURL=app.af203e745fac2ad6d0ff.js.map
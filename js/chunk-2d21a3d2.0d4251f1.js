(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21a3d2"],{bb51:function(e,t,n){"use strict";n.r(t);var s=n("7a23"),o=Object(s["f"])('<section class="mb-8 py-20 text-white text-center relative"><div class="absolute inset-0 w-full h-full bg-contain introduction-bg" style="background-image:url(assets/img/header.png);"></div><div class="container mx-auto"><div class="text-white main-header-content"><h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1><p class="w-full md:w-8/12 mx-auto"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et dolor mollis, congue augue non, venenatis elit. Nunc justo eros, suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna pulvinar, fringilla lorem eget, ullamcorper urna. </p></div></div><img class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full" src="assets/img/introduction-music.png"></section>',1),r={class:"container mx-auto"},a={class:"bg-white rounded border border-gray-200 relative flex flex-col"},c=Object(s["h"])("div",{class:"px-6 pt-6 pb-5 font-bold border-b border-gray-200"},[Object(s["h"])("span",{class:"card-title"},"Songs"),Object(s["h"])("i",{class:"fa fa-headphones-alt float-right text-green-400 text-xl"})],-1),i={id:"playlist"};function l(e,t,n,l,u,d){var g=Object(s["z"])("app-song-item");return Object(s["u"])(),Object(s["d"])(s["a"],null,[o,Object(s["h"])("section",r,[Object(s["h"])("div",a,[c,Object(s["h"])("ol",i,[(Object(s["u"])(!0),Object(s["d"])(s["a"],null,Object(s["y"])(u.songs,(function(e){return Object(s["u"])(),Object(s["d"])(g,{key:e.docID,song:e},null,8,["song"])})),128))])])])],64)}var u=n("5530"),d=n("1da1"),g=(n("159b"),n("96cf"),n("b79f")),m={class:"text-gray-500 text-sm"},b={class:"text-gray-600 text-lg"},f=Object(s["h"])("i",{class:"fa fa-comments text-gray-600"},null,-1);function h(e,t,n,o,r,a){var c=Object(s["z"])("router-link");return Object(s["u"])(),Object(s["d"])("li",{class:"flex justify-between items-center p-3 pl-6 cursor-pointer\n  transition duration-300 hover:bg-gray-50",id:"song-id-".concat(n.song.docID)},[Object(s["h"])("div",null,[Object(s["h"])(c,{to:a.songLink,class:"font-bold block text-gray-600"},{default:Object(s["I"])((function(){return[Object(s["g"])(Object(s["C"])(n.song.modifiedName),1)]})),_:1},8,["to"]),Object(s["h"])("span",m,Object(s["C"])(n.song.displayName),1)]),Object(s["h"])("div",b,[Object(s["h"])(c,{custom:"",to:a.commentLink},{default:Object(s["I"])((function(e){var t=e.navigate;return[Object(s["h"])("span",{class:"comments",onClick:t},[f],8,["onClick"])]})),_:1},8,["to"]),Object(s["g"])(" "+Object(s["C"])(n.song.commentCount),1)])],8,["id"])}var p={name:"AppSongItem",props:{song:{type:Object,required:!0}},computed:{songLink:function(){return{name:"song",params:{id:this.song.docID}}},commentLink:function(){return{name:"song",params:{id:this.song.docID},hash:"#comments"}}}};p.render=h;var j=p,O={name:"Home",components:{AppSongItem:j},data:function(){return{songs:[],isPendingRequest:!1}},created:function(){var e=this;return Object(d["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getSongs();case 2:window.addEventListener("scroll",e.handleScroll);case 3:case"end":return t.stop()}}),t)})))()},beforeUnmount:function(){window.removeEventListener("scroll",this.handleScroll)},methods:{getSongs:function(){var e=this;return Object(d["a"])(regeneratorRuntime.mark((function t(){var n,s,o,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.isPendingRequest){t.next=2;break}return t.abrupt("return");case 2:if(e.isPendingRequest=!0,n=10,!e.songs.length){t.next=14;break}return o=e.songs[e.songs.length-1].docID,t.next=8,g["c"].doc(o).get();case 8:return r=t.sent,t.next=11,g["c"].orderBy("modifiedName").startAfter(r).limit(n).get();case 11:s=t.sent,t.next=17;break;case 14:return t.next=16,g["c"].orderBy("modifiedName").limit(n).get();case 16:s=t.sent;case 17:s.forEach((function(t){e.songs.push(Object(u["a"])({docID:t.id},t.data()))})),e.isPendingRequest=!1;case 19:case"end":return t.stop()}}),t)})))()},handleScroll:function(){var e=document.documentElement,t=e.scrollTop,n=e.offsetHeight,s=window,o=s.innerHeight,r=Math.round(t)+o===n;r&&this.getSongs()}}};O.render=l;t["default"]=O}}]);
//# sourceMappingURL=chunk-2d21a3d2.0d4251f1.js.map
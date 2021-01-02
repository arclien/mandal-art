(this["webpackJsonpmandal-art"]=this["webpackJsonpmandal-art"]||[]).push([[0],{57:function(e,t,n){},92:function(e,t,n){"use strict";n.r(t);var r=n(3),c=n(0),a=n.n(c),o=n(8),i=n.n(o),s=(n(57),n(16)),u=n(6),d=n(9),l=n(5),b=n.n(l),f=n(12),j=n(10),h=n(18),O=n(23);n(59);O.a.configure();var p={position:"top-center",autoClose:3e3,closeOnClick:!0,pauseOnHover:!0},v=function(e){O.a.error(e,Object(j.a)({},p))},m=Object({NODE_ENV:"production",PUBLIC_URL:"/mandal-art",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_TRELLO_API_KEY:"e6f32668896a013c62bb958df65d0d59",REACT_APP_TRELLO_LIST_ID:"5fef20e8bd17c42cb4b89611",REACT_APP_TRELLO_MANDAL_ART_ID:"5fef20e0febcbe541f6444dd",REACT_APP_TRELLO_TOKEN:"1994f828faaa68ad960cf6b50933bfc02a2201de3d1d06f6fde31248dbc78535"}),x=m.REACT_APP_TRELLO_MANDAL_ART_ID,w=(m.REACT_APP_TRELLO_LIST_ID,m.REACT_APP_TRELLO_CARD_ID,m.REACT_APP_TRELLO_API_KEY),_=n(43),g=n(44),k=new(function(){function e(t,n){Object(_.a)(this,e),this.key=t,this.token=n}return Object(g.a)(e,[{key:"auth",value:function(e){var t=this,n=(e.name||"My App").replace(/ /g,"+"),r=e.expiration||"1hour",c=e.scope||{read:!0,write:!0,account:!1};return new Promise((function(e,a){var o=window.location,i=o.protocol,s=o.host,u=o.pathname,d=o.search,l=window.open("https://trello.com/1/authorize?response_type=token&key=".concat(t.key,"&return_url=").concat(i,"//").concat(s).concat(u).concat(d,"&callback_method=postMessage&scope=").concat(Object.keys(c).filter((function(e){return c[e]})).join(","),"&expiration=").concat(r,"&name=").concat(n),"trello","height=606,width=405,left=".concat(window.screenX+(window.innerWidth-420)/2,",right=").concat(window.screenY+(window.innerHeight-470)/2)),b=setTimeout((function(){l.close(),a(new Error("Trello pop-up closed."))}),6e4),f=setInterval((function(){l.closed&&(clearInterval(f),a(new Error("Trello pop-up closed.")))}),500);window.addEventListener("message",(function(n){"string"===typeof n.data&&(clearTimeout(b),l.close(),t.token=n.data,localStorage.setItem("trello_token",n.data),e())}))}))}},{key:"req",value:function(e,t,n){(n=n||{}).key=this.key,n.token=this.token;var r=new URLSearchParams;for(var c in n)r.append(c,n[c]);var a={method:e},o="https://api.trello.com".concat(t);return"POST"===e||"PUT"===e?(a.body=r.toString(),a.headers={"Content-type":"application/x-www-form-urlencoded"}):o+="?".concat(r.toString()),fetch(o,a).then((function(e){return e.json()}))}},{key:"get",value:function(e,t){return this.req("GET",e,t)}},{key:"head",value:function(e,t){return this.req("HEAD",e,t)}},{key:"post",value:function(e,t){return this.req("POST",e,t)}},{key:"put",value:function(e,t){return this.req("PUT",e,t)}},{key:"delete",value:function(e,t){return this.req("DELETE",e,t)}}]),e}())(w),E=function(e){return Promise.resolve().then((function(){return localStorage.getItem("trello_token")})).then((function(e){if(!e)return k.auth({name:"Mandal-art App",scope:{read:!0,write:!0,account:!0},expiration:"never"});k.token=e,k.key=w})).then((function(){return e()})).catch((function(){}))},T=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return k.get("/1/".concat(e),t)},A=function(e){return T("boards/".concat(e))},P=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"all";return T("boards/".concat(e,"/lists/").concat(t))},y=function(e){return T("boards/".concat(e,"/labels"),{limit:100})},L=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"all";return T("boards/".concat(e,"/cards/").concat(t))},R=Object(c.createContext)(),S=R.Provider,C=(R.Consumer,{board:{},lists:[],cards:[],labels:[],isAuthorized:!0}),I={boards:[],me:{}},D=function(e){var t=e.children,n=Object(c.useState)(Object(j.a)({},I)),a=Object(h.a)(n,2),o=a[0],i=a[1],s=Object(c.useState)(Object(j.a)({},C)),u=Object(h.a)(s,2),d=u[0],l=u[1],O=Object(c.useState)(),p=Object(h.a)(O,2),m=p[0],x=p[1];Object(c.useEffect)((function(){Object(f.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(m){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,E().then(Object(f.a)(b.a.mark((function e(){var t,n,r,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,A(m);case 3:return t=e.sent,e.next=6,P(m);case 6:return n=e.sent,e.next=9,L(m);case 9:return r=e.sent,e.next=12,y(m);case 12:c=e.sent,l((function(e){return Object(j.a)(Object(j.a)({},e),{},{board:t,lists:n,cards:r,labels:c})})),e.next=20;break;case 16:e.prev=16,e.t0=e.catch(0),l(Object(j.a)(Object(j.a)({},C),{},{isAuthorized:!1})),v("\uc720\ud6a8\ud558\uc9c0 \uc54a\uc740 \uc811\uadfc\uc785\ub2c8\ub2e4.");case 20:case"end":return e.stop()}}),e,null,[[0,16]])}))));case 4:case"end":return e.stop()}}),e)})))()}),[m]);var w=function(){var e=Object(f.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=null===o||void 0===o?void 0:o.me,"{}"===JSON.stringify(t)||0===Object.keys(t).length){e.next=2;break}return e.abrupt("return",o);case 2:return e.abrupt("return",E().then(Object(f.a)(b.a.mark((function e(){var t,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,T("members/me");case 3:return t=e.sent,e.next=6,T("members/me/boards");case 6:return n=e.sent,i((function(e){return Object(j.a)(Object(j.a)({},e),{},{me:t,boards:n})})),e.abrupt("return",o);case 11:e.prev=11,e.t0=e.catch(0),i(Object(j.a)({},I)),v("\uc720\ud6a8\ud558\uc9c0 \uc54a\uc740 \uc811\uadfc\uc785\ub2c8\ub2e4.");case 15:case"end":return e.stop()}}),e,null,[[0,11]])})))));case 3:case"end":return e.stop()}var t}),e)})));return function(){return e.apply(this,arguments)}}();return Object(r.jsx)(S,{value:{state:{trelloObjects:d},actions:{setBoardId:x,getMyInfo:w}},children:t})},B=R,N={path:"/home",url:"/home",description:"Home Page"},z={path:"/board/:boardId",url:"/board/",description:"Board Page"},M=n(50),H=function(e){var t=e.children,n=e.path,c=Object(M.a)(e,["children","path"]);return Object(r.jsx)(u.b,Object(j.a)(Object(j.a)({path:n},c),{},{children:t}))},q=n(14),K=n(1);function W(){var e=Object(q.a)(["\n  display: flex;\n  width: 100%;\n  flex: 1 1 auto;\n"]);return W=function(){return e},e}function U(){var e=Object(q.a)(["\n  ",";\n"]);return U=function(){return e},e}function F(){var e=Object(q.a)(["\n  margin: 10px;\n"]);return F=function(){return e},e}function J(){var e=Object(q.a)(["\n  ",";\n\n  flex-wrap: wrap;\n  padding: 20px;\n"]);return J=function(){return e},e}function Y(){var e=Object(q.a)(["\n  ",";\n"]);return Y=function(){return e},e}function G(){var e=Object(q.a)(["\n  ",";\n"]);return G=function(){return e},e}function V(){var e=Object(q.a)(["\n  ",";\n\n  width: 100%;\n  padding: 20px;\n  min-height: 100vh;\n"]);return V=function(){return e},e}var X=K.c.div(V(),Object(d.e)("center","center","column")),$=K.c.div(G(),Object(d.f)({size:"26px",color:d.g})),Q=K.c.div(Y(),Object(d.f)({size:"22px",color:d.g})),Z=K.c.div(J(),Object(d.e)("flex-start","center","row")),ee=Object(K.c)(s.b)(F());ee.Button=Object(K.c)(d.b)(U(),Object(d.f)({size:"15px",color:d.h}));var te=K.c.div(W()),ne=function(){var e=Object(c.useContext)(B).actions.getMyInfo,t=Object(c.useState)({email:"",fullName:"",id:"",idBoards:[],boards:[]}),n=Object(h.a)(t,2),a=n[0],o=n[1];return Object(c.useEffect)((function(){Object(f.a)(b.a.mark((function t(){var n,r,c,a,i,s,u;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e();case 2:n=t.sent,r=n.me,c=r.email,a=r.fullName,i=r.id,s=r.idBoards,u=n.boards,o({email:c,fullName:a,id:i,idBoards:s,boards:u});case 10:case"end":return t.stop()}}),t)})))()}),[e]),Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)(X,{children:[Object(r.jsx)($,{children:"Mandal Art"}),Object(r.jsxs)(Q,{children:["\uc720\uc800 \uc774\ub984 : ",null===a||void 0===a?void 0:a.fullName]}),Object(r.jsxs)(Q,{children:["\uc720\uc800 \uc774\uba54\uc77c : ",null===a||void 0===a?void 0:a.email]}),Object(r.jsx)(ee,{to:"/board/".concat(x),children:Object(r.jsx)(ee.Button,{theme:"yellow",size:"xlarge",onClick:function(){},children:"Test Board \uc774\ub3d9"})}),Object(r.jsx)(Z,{children:null===a||void 0===a?void 0:a.boards.map((function(e){var t=e.name,n=e.id;return Object(r.jsx)(ee,{to:"/board/".concat(n),children:Object(r.jsxs)(ee.Button,{theme:"yellow",size:"large",onClick:function(){},children:[t," \uc774\ub3d9"]})},n)}))}),Object(r.jsx)(te,{})]})})};function re(){var e=Object(q.a)(["\n  ","\n  padding:20px;\n"]);return re=function(){return e},e}var ce=K.c.div(re(),d.d),ae=function(){var e=Object(u.h)().params.boardId,t=Object(u.g)(),n=Object(c.useContext)(B),a=n.state.trelloObjects,o=a.board,i=a.lists,s=a.cards,l=(a.labels,a.isAuthorized),j=n.actions.setBoardId;return Object(c.useEffect)((function(){Object(f.a)(b.a.mark((function t(){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:j(e);case 1:case"end":return t.stop()}}),t)})))()}),[e,j]),Object(c.useEffect)((function(){l||t.replace("/home")}),[l,t]),Object(r.jsxs)(ce,{children:[l&&0===i.length&&Object(r.jsx)(d.c,{}),null===o||void 0===o?void 0:o.name,i.map((function(e){var t=e.id,n=e.name;return Object(r.jsxs)("div",{children:[t," - ",n]},t)})),Object(r.jsx)("br",{}),Object(r.jsx)("br",{}),Object(r.jsx)("br",{}),s.map((function(e){var t=e.id,n=e.desc,c=e.idList,a=(e.idLabels,e.name);return Object(r.jsxs)("div",{children:[c," - ",a," - ",n]},t)}))]})};function oe(){var e=Object(q.a)(["\n  min-height: 100vh;\n"]);return oe=function(){return e},e}var ie=K.c.div(oe());var se=function(){var e=N,t=z;return Object(r.jsx)(D,{children:Object(r.jsx)(s.a,{basename:"/mandal-art",children:Object(r.jsxs)(ie,{children:[Object(r.jsx)(d.a,{}),Object(r.jsxs)(u.d,{children:[Object(r.jsx)(H,{path:t.path,children:Object(r.jsx)(ae,{})}),Object(r.jsx)(H,{path:e.path,children:Object(r.jsx)(ne,{})}),Object(r.jsx)(u.a,{to:e.path})]})]})})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(se,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[92,1,2]]]);
//# sourceMappingURL=main.2130b91b.chunk.js.map
(this.webpackJsonpmaximiseonlinestudytools=this.webpackJsonpmaximiseonlinestudytools||[]).push([[11],{160:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(5);function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}},189:function(e,t,a){"use strict";var n=a(54);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=n(a(0)),r=(0,n(a(60)).default)(l.default.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");t.default=r},190:function(e,t,a){"use strict";var n=a(54);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=n(a(0)),r=(0,n(a(60)).default)(l.default.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");t.default=r},191:function(e,t,a){"use strict";var n=a(54);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=n(a(0)),r=(0,n(a(60)).default)(l.default.createElement("path",{d:"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"}),"Done");t.default=r},248:function(e,t,a){"use strict";var n=a(54);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=n(a(0)),r=(0,n(a(60)).default)(l.default.createElement("path",{d:"M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 15h-2v-2h2v2zm0-4h-2V8h2v6zm-1-9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"}),"AssignmentLate");t.default=r},286:function(e,t,a){"use strict";a.r(t);var n=a(34),l=a(160),r=a(21),o=a(5),c=a(0),i=a.n(c),s=a(83),u=a(154),d=a(147),m=a(110),p=a(210),b=a(211),f=a(145),g=a(212),h=a(155),O=a(291),y=a(189),E=a.n(y),j=a(191),v=a.n(j),w=a(190),D=a.n(w),C=a(148),T=a(175),S=a.n(T),x=a(290),k=a(166),M=a.n(k),P=a(165),L=a.n(P),N=a(149),R=a(213),_=a(217),W=a(215),z=a(216),B=a(214),A=a(272),H=a(244),I=a(248),F=a.n(I),V=a(159),J=a(151),U=a(26),Y=a(277),q=(a(4),a(118)),G=a(3),K=(a(1),a(2),a(197)),Q=(a(192),a(194)),X=(a(44),a(28),a(62),a(63),a(64),a(17)),Z=a(168),$=a(178),ee=Object(d.a)({toolbarLandscape:{flexWrap:"wrap"},toolbarAmpmLeftPadding:{paddingLeft:50},separator:{margin:"0 4px 0 2px",cursor:"default"},hourMinuteLabel:{display:"flex",justifyContent:"flex-end",alignItems:"flex-end"},hourMinuteLabelAmpmLandscape:{marginTop:"auto"},hourMinuteLabelReverse:{flexDirection:"row-reverse"},ampmSelection:{marginLeft:20,marginRight:-20,display:"flex",flexDirection:"column"},ampmLandscape:{margin:"4px 0 auto",flexDirection:"row",justifyContent:"space-around",flexBasis:"100%"},ampmSelectionWithSeconds:{marginLeft:15,marginRight:10},ampmLabel:{fontSize:18}},{name:"MuiPickersTimePickerToolbar"});var te=function(e){var t=e.date,a=e.views,n=e.ampm,l=e.openView,r=e.onChange,o=e.isLandscape,i=e.setOpenView,s=Object(q.b)(),u=Object(X.a)(),d=ee(),m=function(e,t,a){var n=Object(q.b)();return{meridiemMode:Object($.d)(e,n),handleMeridiemChange:Object(c.useCallback)((function(l){var r=Object($.c)(e,l,Boolean(t),n);a(r,!1)}),[t,e,a,n])}}(t,n,r),p=m.meridiemMode,b=m.handleMeridiemChange,f=o?"h3":"h2";return Object(c.createElement)(K.b,{isLandscape:o,className:Object(G.a)(o?d.toolbarLandscape:n&&d.toolbarAmpmLeftPadding)},Object(c.createElement)("div",{className:Object(G.a)(d.hourMinuteLabel,n&&o&&d.hourMinuteLabelAmpmLandscape,{rtl:d.hourMinuteLabelReverse}[u.direction])},Object(Z.d)(a,"hours")&&Object(c.createElement)(K.c,{variant:f,onClick:function(){return i($.b.HOURS)},selected:l===$.b.HOURS,label:s.getHourText(t,Boolean(n))}),Object(Z.d)(a,["hours","minutes"])&&Object(c.createElement)(K.f,{label:":",variant:f,selected:!1,className:d.separator}),Object(Z.d)(a,"minutes")&&Object(c.createElement)(K.c,{variant:f,onClick:function(){return i($.b.MINUTES)},selected:l===$.b.MINUTES,label:s.getMinuteText(t)}),Object(Z.d)(a,["minutes","seconds"])&&Object(c.createElement)(K.f,{variant:"h2",label:":",selected:!1,className:d.separator}),Object(Z.d)(a,"seconds")&&Object(c.createElement)(K.c,{variant:"h2",onClick:function(){return i($.b.SECONDS)},selected:l===$.b.SECONDS,label:s.getSecondText(t)})),n&&Object(c.createElement)("div",{className:Object(G.a)(d.ampmSelection,o&&d.ampmLandscape,Object(Z.d)(a,"seconds")&&d.ampmSelectionWithSeconds)},Object(c.createElement)(K.c,{disableRipple:!0,variant:"subtitle1",selected:"am"===p,typographyClassName:d.ampmLabel,label:s.getMeridiemText("am"),onClick:function(){return b("am")}}),Object(c.createElement)(K.c,{disableRipple:!0,variant:"subtitle1",selected:"pm"===p,typographyClassName:d.ampmLabel,label:s.getMeridiemText("pm"),onClick:function(){return b("pm")}})))};function ae(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var ne=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?ae(a,!0).forEach((function(t){Object(o.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ae(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},Q.c,{openTo:"hours",views:["hours","minutes"]});function le(e){var t=Object(q.b)();return{getDefaultFormat:function(){return Object(K.h)(e.format,e.ampm,{"12h":t.time12hFormat,"24h":t.time24hFormat})}}}var re=Object(K.g)({useOptions:le,Input:K.d,useState:K.i,DefaultToolbarComponent:te}),oe=Object(K.g)({useOptions:le,Input:K.a,useState:K.e,DefaultToolbarComponent:te,getCustomProps:function(e){return{refuse:e.ampm?/[^\dap]+/gi:/[^\d]+/gi}}});re.defaultProps=ne,oe.defaultProps=ne;var ce=a(112),ie=a(22),se=Object(d.a)((function(e){var t;return{loadingContainer:{textAlign:"center",margin:"0 auto",paddingTop:"40%"},newTodo:{marginTop:16},iconBtn:{marginBottom:8},swiper:{borderRadius:"8px 8px 0 0"},card:(t={},Object(o.a)(t,e.breakpoints.down(600),{borderRadius:"0px"}),Object(o.a)(t,e.breakpoints.up(600),{height:"100%"}),Object(o.a)(t,"height","100%"),t),late:{color:e.palette.error.main},snackbar:{backgroundColor:e.palette.background.paper,border:"2px solid ".concat(e.palette.primary.main),borderRadius:16,color:e.palette.text.primary}}}));t.default=function(){var e=Object(U.b)(),t=se(),a=Object(c.useState)(new Date),d=Object(r.a)(a,2),y=d[0],j=d[1],w=Object(c.useState)(new Date),T=Object(r.a)(w,2),k=T[0],P=T[1],I=Object(c.useState)([]),q=Object(r.a)(I,2),G=q[0],K=q[1],Q=Object(c.useState)(!1),X=Object(r.a)(Q,2),Z=X[0],$=X[1],ee=Object(c.useState)(!1),te=Object(r.a)(ee,2),ae=te[0],ne=te[1],le=Object(c.useState)(!1),re=Object(r.a)(le,2),ue=re[0],de=re[1],me=Object(c.useState)(0),pe=Object(r.a)(me,2),be=pe[0],fe=pe[1],ge=Object(c.useState)({desc:"",newTitle:"",newDesc:""}),he=Object(r.a)(ge,2),Oe=he[0],ye=he[1],Ee=Object(c.useState)(0),je=Object(r.a)(Ee,2),ve=je[0],we=je[1],De=Object(c.useState)({delete:!1,edit:!1,newTodo:!1,poo:!1}),Ce=Object(r.a)(De,2),Te=Ce[0],Se=Ce[1],xe=Object(N.a)("(min-width: 600px)"),ke=xe?g.a:S.a,Me=function(e){return function(){Se(Object(l.a)({},Te,Object(o.a)({},e,!1)))}},Pe=function(e,t){return function(){we(t),j(new Date),P(new Date),"edit"===e&&ye(Object(l.a)({},Oe,{desc:ae[t].desc})),Se(Object(l.a)({},Te,Object(o.a)({},e,!0)))}},Le=function(e){return function(t){"poo"===t.target.value.toLowerCase()&&Se(Object(l.a)({},Te,{poo:!0})),ye(Object(l.a)({},Oe,Object(o.a)({},e,t.target.value)))}},Ne=function(e){return function(){K([ae[e],e]),de(ae.filter((function(t,a){return e!==a})))}};return Object(c.useEffect)((function(){fetch("https://maximise.herokuapp.com/users/get_data/agenda",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sessionID:Object(ie.a)("sessionID"),username:Object(ie.a)("email")})}).then((function(e){return e.json()})).then((function(e){console.log(e),ne(e.response),de(e.response)})).catch((function(){e({type:"NEW_ERROR",payload:"There was an error loading your agenda"})}))}),[]),Object(c.useEffect)((function(){ne(ue),fetch("https://maximise.herokuapp.com/users/update_data/agenda",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({newData:ue,sessionID:Object(ie.a)("sessionID"),username:Object(ie.a)("email")})}).then((function(e){return e.json()})).then((function(t){"{}"!==JSON.stringify(t.errors)?e({type:"NEW_ERROR",payload:"There was an error updating your agenda"}):ne(ue)})).catch((function(){e({type:"NEW_ERROR",payload:"There was an error updating your agenda"})}))}),[ue]),ae?i.a.createElement(i.a.Fragment,null,i.a.createElement(s.a,{className:"fade padding"},i.a.createElement(ke,xe?{container:!0,spacing:2,className:t.container}:{index:be,onChangeIndex:function(e){fe(e)},enableMouseEvents:!0,className:t.swiper},ae.map((function(e,a){return i.a.createElement(g.a,{item:!0,xs:12,sm:6,md:4,lg:3,key:a,style:{height:ke===S.a&&"100%"}},i.a.createElement(p.a,{className:t.card},i.a.createElement(b.a,null,i.a.createElement("div",{style:{display:"flex",alignItems:"center"}},i.a.createElement(m.a,{variant:"h5",gutterBottom:!0,style:{overflow:"hidden",textTruncate:"ellipsis"},className:(new Date).getTime()>new Date(e.date).getTime()?t.late:null},e.subject),i.a.createElement("div",{style:{marginLeft:"auto",display:"flex"}},i.a.createElement(C.a,{placement:"bottom",title:"Delete"},i.a.createElement(h.a,{color:"primary",className:t.iconBtn,onClick:Pe("delete",a)},i.a.createElement(E.a,null))),i.a.createElement(C.a,{placement:"bottom",title:"Edit"},i.a.createElement(h.a,{color:"primary",className:t.iconBtn,onClick:Pe("edit",a)},i.a.createElement(D.a,null))),i.a.createElement(C.a,{placement:"bottom",title:"Done"},i.a.createElement(h.a,{color:"primary",className:t.iconBtn,onClick:Ne(a)},i.a.createElement(v.a,null))))),i.a.createElement(m.a,{className:"highlight"},new Date(e.date).toLocaleDateString()+" ","All Day"===e.time?e.time:new Date(e.date).toLocaleTimeString().split(":").slice(0,-1).join(":"),(new Date).getTime()>new Date(e.date).getTime()&&i.a.createElement("span",{className:t.late}," ",i.a.createElement(F.a,{style:{marginBottom:-4}})," Late")),i.a.createElement(m.a,null,e.desc))))}))),ae.length>0?!xe&&i.a.createElement(x.a,{variant:"dots",style:{marginBottom:16,borderRadius:"0 0 8px 8px"},steps:ae.length,position:"static",activeStep:be,nextButton:i.a.createElement(h.a,{size:"small",onClick:function(){return fe(be+1)},disabled:be===ae.length-1},i.a.createElement(L.a,null)),backButton:i.a.createElement(h.a,{size:"small",onClick:function(){return fe(be-1)},disabled:0===be},i.a.createElement(M.a,null))}):i.a.createElement("p",null,"You don't have anything on your agenda yet"),i.a.createElement(f.a,{variant:"contained",className:t.newTodo,onClick:Pe("newTodo",0)},"New Todo"),i.a.createElement(R.a,{open:Te.delete,onClose:Me("delete"),"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},i.a.createElement(B.a,{id:"alert-dialog-title"},"Confirm action"),i.a.createElement(W.a,null,i.a.createElement(z.a,{id:"alert-dialog-description"},"Are you sure you want to delete this todo?")),i.a.createElement(_.a,null,i.a.createElement(f.a,{onClick:Me("delete"),color:"primary",variant:"outlined"},"Cancel"),i.a.createElement(f.a,{onClick:function(){de(ae.filter((function(e,t){return t!==ve}))),Se(Object(l.a)({},Te,{delete:!1}))},color:"primary",autoFocus:!0},"Delete"))),i.a.createElement(R.a,{open:Te.poo,onClose:Me("poo"),"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},i.a.createElement(B.a,{id:"alert-dialog-title"},"POO"),i.a.createElement(W.a,null,i.a.createElement(z.a,{id:"alert-dialog-description",style:{fontSize:120}},i.a.createElement("span",{role:"img","aria-label":"poo"},"\ud83d\udca9"))),i.a.createElement(_.a,null,i.a.createElement(f.a,{onClick:Me("poo"),color:"primary"},"Close"))),i.a.createElement(R.a,{open:Te.edit,onClose:Me("edit"),"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",fullWidth:!0},i.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t=new Date(k),a=new Date(y);Z?(a.setHours(23),a.setMinutes(59)):(a.setHours(t.getHours()),a.setMinutes(t.getMinutes())),de(ae.map((function(e,t){return t===ve?Object(l.a)({},e,{desc:Oe.desc,date:a,time:!!Z&&"All Day"}):e}))),Me("edit")()}},i.a.createElement(B.a,{id:"alert-dialog-title"},"Change todo description"),i.a.createElement(W.a,null,i.a.createElement(O.a,{onChange:Le("desc"),value:Oe.desc,variant:"filled",label:"Enter the new todo description",autoFocus:!0,fullWidth:!0}),i.a.createElement(Y.b,{clearable:!0,value:y,placeholder:"10/10/2018",onChange:function(e){return j(e)},style:{marginTop:16},minDate:new Date,label:"Date",format:"dd/MM/yyyy",fullWidth:!0,DialogProps:{fullWidth:!1,maxWidth:"xs"}}),i.a.createElement(oe,{label:"Time",placeholder:"08:00",mask:"__:__",value:k,onChange:function(e){return P(e)},ampm:!1,style:{marginTop:16},disabled:Z,fullWidth:!0}),i.a.createElement(H.a,{style:{marginTop:16},control:i.a.createElement(A.a,{checked:Z,onChange:function(e){return $(e.target.checked)},value:"All Day",inputProps:{"aria-label":"all day"}}),label:"All Day"})),i.a.createElement(_.a,null,i.a.createElement(f.a,{onClick:Me("edit"),color:"primary"},"Cancel"),i.a.createElement(f.a,{type:"submit",color:"primary",disabled:""===Oe.desc},"Change")))),i.a.createElement(R.a,{open:Te.newTodo,onClose:Me("newTodo"),"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",fullWidth:!0},i.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t=new Date(k),a=new Date(y);Z?(a.setHours(23),a.setMinutes(59)):(a.setHours(t.getHours()),a.setMinutes(t.getMinutes())),de([{subject:Oe.newTitle,desc:Oe.newDesc,date:a,time:!!Z&&"All Day"}].concat(Object(n.a)(ae))),Me("newTodo")(),ye({desc:"",newTitle:"",newDesc:""})}},i.a.createElement(B.a,{id:"alert-dialog-title"},"Create a new todo"),i.a.createElement(W.a,null,i.a.createElement(O.a,{onChange:Le("newTitle"),value:Oe.newTitle,variant:"filled",label:"Enter the new todo's title",autoFocus:!0,fullWidth:!0,style:{marginBottom:16}}),i.a.createElement(O.a,{onChange:Le("newDesc"),value:Oe.newDesc,variant:"filled",label:"Enter the new todo's description",fullWidth:!0}),i.a.createElement(Y.b,{clearable:!0,value:y,placeholder:"10/10/2018",onChange:function(e){return j(e)},style:{marginTop:16},minDate:new Date,label:"Date",format:"dd/MM/yyyy",fullWidth:!0,DialogProps:{fullWidth:!1,maxWidth:"xs"}}),i.a.createElement(oe,{label:"Time",placeholder:"08:00",mask:"__:__",value:k,onChange:function(e){return P(e)},ampm:!1,style:{marginTop:16},disabled:Z,fullWidth:!0}),i.a.createElement(H.a,{style:{marginTop:16},control:i.a.createElement(A.a,{checked:Z,onChange:function(e){return $(e.target.checked)},value:"All Day",inputProps:{"aria-label":"all day"}}),label:"All Day"})),i.a.createElement(_.a,null,i.a.createElement(f.a,{onClick:Me("newTodo"),color:"primary"},"Cancel"),i.a.createElement(f.a,{type:"submit",color:"primary",disabled:""===Oe.newTitle||""===Oe.newDesc},"Create"))))),i.a.createElement(ce.a,{container:document.getElementById("root")},i.a.createElement(V.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},style:{position:"absolute",bottom:8,zIndex:1e9,left:8},open:0!==G.length,autoHideDuration:5e3,onClose:function(){return K([])}},i.a.createElement(J.a,{message:"Todo completed",style:{borderRadius:8},className:t.snackbar,action:i.a.createElement(f.a,{color:"primary",onClick:function(){de([].concat(Object(n.a)(ae.filter((function(e,t){return t<G[1]}))),[G[0]],Object(n.a)(ae.filter((function(e,t){return t>=G[1]}))))),K([])}},"Undo")})))):i.a.createElement("div",{className:t.loadingContainer},i.a.createElement(u.a,null))}}}]);
//# sourceMappingURL=11.ad175f74.chunk.js.map
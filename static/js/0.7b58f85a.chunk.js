(this["webpackJsonpdemo-mui"]=this["webpackJsonpdemo-mui"]||[]).push([[0],{320:function(t,a,e){"use strict";e.r(a);var r=e(6),n=e(21),o=e(146),i=e(152),l=e(41),c=e(299),s=e(330),m=e(309),g=e(331),f=e(332),d=e(0),u=e.n(d),h=function(t){var a=t.children,e=Object(n.a)(t,["children"]),h=Object(d.useState)(0),p=Object(r.a)(h,2),b=p[0],v=p[1];return u.a.createElement(u.a.Fragment,null,u.a.createElement(o.a,{className:e.className},u.a.createElement(i.a,{my:2,p:2},u.a.createElement(l.a,{variant:"h1"},e.title),u.a.createElement(c.a,{color:"primary",onClick:function(){return v((function(t){return t-1}))}},u.a.createElement(m.a,null)),u.a.createElement(s.a,{badgeContent:b,max:10,color:"primary"},u.a.createElement(g.a,null)),u.a.createElement(c.a,{color:"primary",onClick:function(){return v((function(t){return t+1}))}},u.a.createElement(f.a,null)))),a)};function p(t){return u.a.createElement(h,{title:t.title},t.greedy?t.children:t.isExact?"PLEASE CLICK":null)}e.d(a,"default",(function(){return p}))},330:function(t,a,e){"use strict";var r=e(1),n=e(2),o=e(0),i=e.n(o),l=(e(5),e(3)),c=e(4),s=e(7),m=i.a.forwardRef((function(t,a){var e=t.anchorOrigin,o=void 0===e?{vertical:"top",horizontal:"right"}:e,c=t.badgeContent,m=t.children,g=t.classes,f=t.className,d=t.color,u=void 0===d?"default":d,h=t.component,p=void 0===h?"span":h,b=t.invisible,v=t.max,O=void 0===v?99:v,y=t.overlap,C=void 0===y?"rectangle":y,E=t.showZero,x=void 0!==E&&E,j=t.variant,R=void 0===j?"standard":j,k=Object(n.a)(t,["anchorOrigin","badgeContent","children","classes","className","color","component","invisible","max","overlap","showZero","variant"]),z=b;null==b&&(0===c&&!x||null==c&&"dot"!==R)&&(z=!0);var S="";return"dot"!==R&&(S=c>O?"".concat(O,"+"):c),i.a.createElement(p,Object(r.a)({className:Object(l.a)(g.root,f),ref:a},k),m,i.a.createElement("span",{className:Object(l.a)(g.badge,g["".concat(o.horizontal).concat(Object(s.a)(o.vertical),"}")],g["anchorOrigin".concat(Object(s.a)(o.vertical)).concat(Object(s.a)(o.horizontal)).concat(Object(s.a)(C))],"default"!==u&&g["color".concat(Object(s.a)(u))],z&&g.invisible,{dot:g.dot}[R])},S))}));a.a=Object(c.a)((function(t){return{root:{position:"relative",display:"inline-flex",verticalAlign:"middle",flexShrink:0},badge:{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",alignContent:"center",alignItems:"center",position:"absolute",boxSizing:"border-box",fontFamily:t.typography.fontFamily,fontWeight:t.typography.fontWeightMedium,fontSize:t.typography.pxToRem(12),minWidth:20,lineHeight:1,padding:"0 6px",height:20,borderRadius:10,backgroundColor:t.palette.color,color:t.palette.textColor,zIndex:1,transition:t.transitions.create("transform",{easing:t.transitions.easing.easeInOut,duration:t.transitions.duration.enteringScreen})},colorPrimary:{backgroundColor:t.palette.primary.main,color:t.palette.primary.contrastText},colorSecondary:{backgroundColor:t.palette.secondary.main,color:t.palette.secondary.contrastText},colorError:{backgroundColor:t.palette.error.main,color:t.palette.error.contrastText},dot:{height:6,minWidth:6,padding:0},anchorOriginTopRightRectangle:{top:0,right:0,transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%","&$invisible":{transform:"scale(0) translate(50%, -50%)"}},anchorOriginBottomRightRectangle:{bottom:0,right:0,transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%","&$invisible":{transform:"scale(0) translate(50%, 50%)"}},anchorOriginTopLeftRectangle:{top:0,left:0,transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%","&$invisible":{transform:"scale(0) translate(-50%, -50%)"}},anchorOriginBottomLeftRectangle:{bottom:0,left:0,transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%","&$invisible":{transform:"scale(0) translate(-50%, 50%)"}},anchorOriginTopRightCircle:{top:"14%",right:"14%",transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%","&$invisible":{transform:"scale(0) translate(50%, -50%)"}},anchorOriginBottomRightCircle:{bottom:"14%",right:"14%",transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%","&$invisible":{transform:"scale(0) translate(50%, 50%)"}},anchorOriginTopLeftCircle:{top:"14%",left:"14%",transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%","&$invisible":{transform:"scale(0) translate(-50%, -50%)"}},anchorOriginBottomLeftCircle:{bottom:"14%",left:"14%",transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%","&$invisible":{transform:"scale(0) translate(-50%, 50%)"}},invisible:{transition:t.transitions.create("transform",{easing:t.transitions.easing.easeInOut,duration:t.transitions.duration.leavingScreen})}}}),{name:"MuiBadge"})(m)},331:function(t,a,e){"use strict";var r=e(0),n=e.n(r),o=e(34);a.a=Object(o.a)(n.a.createElement("path",{d:"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"}),"Favorite")},332:function(t,a,e){"use strict";var r=e(0),n=e.n(r),o=e(34);a.a=Object(o.a)(n.a.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add")}}]);
//# sourceMappingURL=0.7b58f85a.chunk.js.map
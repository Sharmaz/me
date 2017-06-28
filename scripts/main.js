"use strict";var $navbarNav=$("#navbarNav");$(".navbar li a").click(function(n){n.preventDefault(),$navbarNav.attr("aria-expanded","false"),$navbarNav.removeClass("show")}),$(function(){$(".navbar li a").bind("click",function(n){var t=$(this);$("html, body").stop().animate({scrollTop:$(t.attr("href")).offset().top-69},1e3,"easeInOutExpo"),n.preventDefault()})}),$("#myModal").on("shown.bs.modal",function(){}),jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(n,t,e,a,u){return jQuery.easing[jQuery.easing.def](n,t,e,a,u)},easeInQuad:function(n,t,e,a,u){return a*(t/=u)*t+e},easeOutQuad:function(n,t,e,a,u){return-a*(t/=u)*(t-2)+e},easeInOutQuad:function(n,t,e,a,u){return(t/=u/2)<1?a/2*t*t+e:-a/2*(--t*(t-2)-1)+e},easeInCubic:function(n,t,e,a,u){return a*(t/=u)*t*t+e},easeOutCubic:function(n,t,e,a,u){return a*((t=t/u-1)*t*t+1)+e},easeInOutCubic:function(n,t,e,a,u){return(t/=u/2)<1?a/2*t*t*t+e:a/2*((t-=2)*t*t+2)+e},easeInQuart:function(n,t,e,a,u){return a*(t/=u)*t*t*t+e},easeOutQuart:function(n,t,e,a,u){return-a*((t=t/u-1)*t*t*t-1)+e},easeInOutQuart:function(n,t,e,a,u){return(t/=u/2)<1?a/2*t*t*t*t+e:-a/2*((t-=2)*t*t*t-2)+e},easeInQuint:function(n,t,e,a,u){return a*(t/=u)*t*t*t*t+e},easeOutQuint:function(n,t,e,a,u){return a*((t=t/u-1)*t*t*t*t+1)+e},easeInOutQuint:function(n,t,e,a,u){return(t/=u/2)<1?a/2*t*t*t*t*t+e:a/2*((t-=2)*t*t*t*t+2)+e},easeInSine:function(n,t,e,a,u){return-a*Math.cos(t/u*(Math.PI/2))+a+e},easeOutSine:function(n,t,e,a,u){return a*Math.sin(t/u*(Math.PI/2))+e},easeInOutSine:function(n,t,e,a,u){return-a/2*(Math.cos(Math.PI*t/u)-1)+e},easeInExpo:function(n,t,e,a,u){return 0==t?e:a*Math.pow(2,10*(t/u-1))+e},easeOutExpo:function(n,t,e,a,u){return t==u?e+a:a*(1-Math.pow(2,-10*t/u))+e},easeInOutExpo:function(n,t,e,a,u){return 0==t?e:t==u?e+a:(t/=u/2)<1?a/2*Math.pow(2,10*(t-1))+e:a/2*(2-Math.pow(2,-10*--t))+e},easeInCirc:function(n,t,e,a,u){return-a*(Math.sqrt(1-(t/=u)*t)-1)+e},easeOutCirc:function(n,t,e,a,u){return a*Math.sqrt(1-(t=t/u-1)*t)+e},easeInOutCirc:function(n,t,e,a,u){return(t/=u/2)<1?-a/2*(Math.sqrt(1-t*t)-1)+e:a/2*(Math.sqrt(1-(t-=2)*t)+1)+e},easeInElastic:function(n,t,e,a,u){var r=1.70158,i=0,s=a;if(0==t)return e;if(1==(t/=u))return e+a;if(i||(i=.3*u),s<Math.abs(a)){s=a;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(a/s);return-s*Math.pow(2,10*(t-=1))*Math.sin((t*u-r)*(2*Math.PI)/i)+e},easeOutElastic:function(n,t,e,a,u){var r=1.70158,i=0,s=a;if(0==t)return e;if(1==(t/=u))return e+a;if(i||(i=.3*u),s<Math.abs(a)){s=a;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(a/s);return s*Math.pow(2,-10*t)*Math.sin((t*u-r)*(2*Math.PI)/i)+a+e},easeInOutElastic:function(n,t,e,a,u){var r=1.70158,i=0,s=a;if(0==t)return e;if(2==(t/=u/2))return e+a;if(i||(i=u*(.3*1.5)),s<Math.abs(a)){s=a;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(a/s);return t<1?s*Math.pow(2,10*(t-=1))*Math.sin((t*u-r)*(2*Math.PI)/i)*-.5+e:s*Math.pow(2,-10*(t-=1))*Math.sin((t*u-r)*(2*Math.PI)/i)*.5+a+e},easeInBack:function(n,t,e,a,u,r){return void 0==r&&(r=1.70158),a*(t/=u)*t*((r+1)*t-r)+e},easeOutBack:function(n,t,e,a,u,r){return void 0==r&&(r=1.70158),a*((t=t/u-1)*t*((r+1)*t+r)+1)+e},easeInOutBack:function(n,t,e,a,u,r){return void 0==r&&(r=1.70158),(t/=u/2)<1?a/2*(t*t*((1+(r*=1.525))*t-r))+e:a/2*((t-=2)*t*((1+(r*=1.525))*t+r)+2)+e},easeInBounce:function(n,t,e,a,u){return a-jQuery.easing.easeOutBounce(n,u-t,0,a,u)+e},easeOutBounce:function(n,t,e,a,u){return(t/=u)<1/2.75?a*(7.5625*t*t)+e:t<2/2.75?a*(7.5625*(t-=1.5/2.75)*t+.75)+e:t<2.5/2.75?a*(7.5625*(t-=2.25/2.75)*t+.9375)+e:a*(7.5625*(t-=2.625/2.75)*t+.984375)+e},easeInOutBounce:function(n,t,e,a,u){return t<u/2?.5*jQuery.easing.easeInBounce(n,2*t,0,a,u)+e:.5*jQuery.easing.easeOutBounce(n,2*t-u,0,a,u)+.5*a+e}});
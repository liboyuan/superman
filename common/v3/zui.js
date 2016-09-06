var ZUI = {
  hooks: {
    ready: []
  },
  user: {},
  debug: true,
  ready: function() {
    if (ZUI.hooks.ready.length > 0) {
      for (var i = 0; i < ZUI.hooks.ready.length; i++) {
        setTimeout(ZUI.hooks.ready[i], 0);
      }
    };
  },
  onReady: function(fn) {
    this.hooks.ready.push(fn);
  },
  log: function(obj) {
    console.log(obj);
  },
  checkCookie: function() {
      var dt = new Date();
      dt.setSeconds(dt.getSeconds() + 60);
      document.cookie = "cookietest=1; expires=" + dt.toGMTString();
      return document.cookie.indexOf("cookietest=") != -1;
    }
    /*,
      courseHref:false*/
};
$(function() {

  $.ajax({
    type: "post",
    url: "/user/do_get_info",
    dataType: "json",
    success: function(resp) {
      ZUI.user = resp.user;
      ZUI.ready();
    },
    error:function(){
      ZUI.user = [];
      ZUI.ready();
    }
  });
});
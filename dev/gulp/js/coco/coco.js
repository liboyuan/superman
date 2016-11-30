"file:" == window.location.protocol && alert("To test this demo properly please use a local server such as XAMPP or WAMP. See README.md for more details.");
var resizeableImage = function(e) {
    var t, n = new Image,
        e = $(e).get(0),
        o = {},
        i = !1,
        a = document.createElement("canvas");
    init = function() { n.src = e.src, $(e).wrap('<div class="resize-container"></div>').before('<span class="resize-handle resize-handle-nw"></span>').before('<span class="resize-handle resize-handle-ne"></span>').after('<span class="resize-handle resize-handle-se"></span>').after('<span class="resize-handle resize-handle-sw"></span>'), t = $(e).parent(".resize-container"), t.on("mousedown touchstart", ".resize-handle", startResize), t.on("mousedown touchstart", "img", startMoving), $(".js-crop").on("click", crop) }, startResize = function(e) { e.preventDefault(), e.stopPropagation(), saveEventState(e), $(document).on("mousemove touchmove", resizing), $(document).on("mouseup touchend", endResize) }, endResize = function(e) { e.preventDefault(), $(document).off("mouseup touchend", endResize), $(document).off("mousemove touchmove", resizing) }, saveEventState = function(e) { o.container_width = t.width(), o.container_height = t.height(), o.container_left = t.offset().left, o.container_top = t.offset().top, o.mouse_x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft(), o.mouse_y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop(), "undefined" != typeof e.originalEvent.touches && (o.touches = [], $.each(e.originalEvent.touches, function(e, t) { o.touches[e] = {}, o.touches[e].clientX = 0 + t.clientX, o.touches[e].clientY = 0 + t.clientY })), o.evnt = e }, resizing = function(e) {
        var a, s, c, r, l = {};
        t.offset();
        l.x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft(), l.y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop(), $(o.evnt.target).hasClass("resize-handle-se") ? (a = l.x - o.container_left, s = l.y - o.container_top, c = o.container_left, r = o.container_top) : $(o.evnt.target).hasClass("resize-handle-sw") ? (a = o.container_width - (l.x - o.container_left), s = l.y - o.container_top, c = l.x, r = o.container_top) : $(o.evnt.target).hasClass("resize-handle-nw") ? (a = o.container_width - (l.x - o.container_left), s = o.container_height - (l.y - o.container_top), c = l.x, r = l.y, (i || e.shiftKey) && (r = l.y - (a / n.width * n.height - s))) : $(o.evnt.target).hasClass("resize-handle-ne") && (a = l.x - o.container_left, s = o.container_height - (l.y - o.container_top), c = o.container_left, r = l.y, (i || e.shiftKey) && (r = l.y - (a / n.width * n.height - s))), (i || e.shiftKey) && (s = a / n.width * n.height), resizeImage(a, s), t.offset({ left: c, top: r }) }, resizeImage = function(t, o) { a.width = t, a.height = o, a.getContext("2d").drawImage(n, 0, 0, t, o), $(e).attr("src", a.toDataURL("image/png")) }, startMoving = function(e) { e.preventDefault(), e.stopPropagation(), saveEventState(e), $(document).on("mousemove touchmove", moving), $(document).on("mouseup touchend", endMoving) }, endMoving = function(e) { e.preventDefault(), $(document).off("mouseup touchend", endMoving), $(document).off("mousemove touchmove", moving) }, moving = function(e) {
        var n, i = {};
        if (e.preventDefault(), e.stopPropagation(), n = e.originalEvent.touches, i.x = (e.clientX || e.pageX || n[0].clientX) + $(window).scrollLeft(), i.y = (e.clientY || e.pageY || n[0].clientY) + $(window).scrollTop(), t.offset({ left: i.x - (o.mouse_x - o.container_left), top: i.y - (o.mouse_y - o.container_top) }), o.touches && o.touches.length > 1 && n.length > 1) {
            var a = o.container_width,
                s = o.container_height,
                c = o.touches[0].clientX - o.touches[1].clientX;
            c *= c;
            var r = o.touches[0].clientY - o.touches[1].clientY;
            r *= r;
            var l = Math.sqrt(c + r);
            c = e.originalEvent.touches[0].clientX - n[1].clientX, c *= c, r = e.originalEvent.touches[0].clientY - n[1].clientY, r *= r;
            var h = Math.sqrt(c + r),
                u = h / l;
            a *= u, s *= u, resizeImage(a, s) } }, crop = function() {
        var n, o = $(".overlay").offset().left - t.offset().left,
            i = $(".overlay").offset().top - t.offset().top,
            a = $(".overlay").width(),
            s = $(".overlay").height();
        n = document.createElement("canvas"), n.width = a, n.height = s, n.getContext("2d").drawImage(e, o, i, a, s, 0, 0, a, s), window.open(n.toDataURL("image/png")) }, init() };
$(function() { resizeableImage($(".resize-image")) });

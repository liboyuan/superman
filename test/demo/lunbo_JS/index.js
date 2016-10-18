/**
 *
 * @authors Your Name (you@example.org)
 * @date    2015-04-24 21:50:05
 * @version $Id$
 */
window.onload = function() {
    var doc = document;
    /*轮播*/
    var aImgSrc = ["images/1.jpg", "images/2.jpg", "images/3.jpg", "images/4.jpg", "images/5.jpg"];
    var oCarousel = doc.getElementById("carousel");
    var oPic = doc.getElementById("pic");
    var aImg = oPic.getElementsByTagName("img");
    var aBtns = doc.getElementById("btns").getElementsByTagName("li");
    var oPrev = doc.getElementById("prev");
    var oNext = doc.getElementById("next");
    var oPages = doc.getElementById('pages');
    var iNow = 0;
    var iNext = 0;
    var oTimer = null;
    var iWidth = parseInt(getStyle(aImg[0], "width"));

    auto();
    oPages.innerHTML = iNext + 1 + '/' + aImgSrc.length;
    oCarousel.onmouseover = function() {
        oPages.style.display = oPrev.style.display = oNext.style.display = 'block';
        clearInterval(oTimer);
    }
    oCarousel.onmouseout = function() {
        oPages.style.display = oPrev.style.display = oNext.style.display = 'none';
        auto();
    }
    oNext.onclick = function() {
        iNext = iNow + 1;
        if (iNext == aImgSrc.length) {
            iNext = 0;
        };
        next();
    }
    oPrev.onclick = function() {
        iNext = iNow - 1;
        if (iNext < 0) {
            iNext = aImgSrc.length - 1;
        };
        prev();
    }
    for (var i = 0; i < aBtns.length; i++) {
        aBtns[i].index = i;
        aBtns[i].onclick = function() {
            if (iNext == this.index) {
                return;
            };
            iNext = this.index;
            if (iNext > iNow) {
                next();
            } else {
                prev();
            };
        }
    };
    /*自动播放*/
    function auto() {
        clearInterval(oTimer);
        oTimer = setInterval(function() {
            iNext = iNow + 1;
            if (iNext == aImgSrc.length) {
                iNext = 0;
            };
            next();
        }, 2000);
    }

/*下一张*/
    function next() {
        aImg[0].src = aImgSrc[iNow];
        aImg[1].src = aImgSrc[iNext];
        oPic.style.left = '0px';
        aBtns[iNow].className = '';
        aBtns[iNext].className = 'active';
        oPages.innerHTML = iNext + 1 + '/' + aImgSrc.length;
        iNow = iNext;
        move(oPic, {
            'left': -iWidth
        }, 500, 'linear');
    }
/*上一张*/
    function prev() {
        aImg[0].src = aImgSrc[iNext];
        aImg[1].src = aImgSrc[iNow];
        oPic.style.left = -iWidth + 'px';
        aBtns[iNow].className = '';
        aBtns[iNext].className = 'active';
        iNow = iNext;
        oPages.innerHTML = iNext + 1 + '/' + aImgSrc.length;
        move(oPic, {
            'left': 0
        }, 500, 'linear');
    }
};

//获取css样式
function getStyle(obj, sAttr) {
    return obj.currentStyle ? obj.currentStyle[sAttr] : getComputedStyle(obj)[sAttr];
}

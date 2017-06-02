var popup = {
    p: 0,
    template: '<div class="popmask"></div><div class="popup"><div class="poptitlebox clearfix"><span class="poptitle">{{&title}}</span><a href="javascript:;" class="popclose"></a></div><div id="popbody" class="popbody">{{&body}}</div></div>',
    timer: '',
    hooks: {
        "close": []
    },
    login: function() {
        var body = '<div class="form_box pop_w360">';
        body += '<form id="login_form" action="/user/do_login" class="user-form">';
        body += '<div class="user_name_box">';
        body += '<div class="input-wrapper">';
        body += '<input type="text" class="form_input form_user login" id="asso" name="asso" valid-empty="true|邮箱或手机不能为空" valid-isasso="true|邮箱或手机格式不正确" autocomplete="off" placeholder="请输入你的邮箱或手机">';
        body += '</div>';
        body += '<label class="error none" id="msg_field_asso"></label>';
        body += '</div>';
        body += '<div class="password_box">';
        body += '<div class="input-wrapper">';
        body += '<input type="password" class="form_input form_pass fl_n" id="password" name="password" maxlength="18" valid-empty="true|密码不能为空" autocomplete="off" placeholder="请输入你的密码">';
        body += '</div>';
        body += '<label class="error none" id="msg_field_password"></label>';
        body += '</div>';
        body += '<div class="code_box clearfix">';
        body += '<div class="input-wrapper">';
        body += '<input type="text" class="form_input code pass_img fl_n" id="captcha" name="captcha">';
        body += '<div class="signCode"><img class="signCode" id="signCode" src="/user/captcha"/></div>';
        body += '</div>';
        body += '<label class="error none" id="msg_field_captcha"></label>';
        body += '</div>';
        body += '<input type="submit" class="submit red_btn" value="登录">';
        body += '<label class="error none" id="msg_field_default"></label>';
        body += '</form>';
        body += '</div>';
        body += '<div id="regRetrieve" class="clearfix"> <a href="/user/register" title="注册职上账号">注册职上账号</a><span>|</span><a href=" /user/mobile_retrieve_password" title="忘记密码？">忘记密码？</a> </div>'
        this.show('登录职上', body);
        $(".poptitle").css("fontSize", "24px");
    },
    bindMobile: function() {
        var body = '<div class="setting_bind_box">';
        body += '<div class="setting_bind_title setting-bind form_box">';
        // 20160226 杨兴龙
        // 问题备注
        // user-form导致重复提交
        body += '<form class="user-mobile-bind-form " action="/user/do_bind_mobile">';
        body += '<div class="user_name_box">';
        body += '<div class="input-wrapper">';
        body += '<input type="text" class="form_input form_mobile_num" name="mobile" id="mobile"  valid-empty="true|手机号不能为空" valid-ismobile="true|手机格式错误" placeholder="请输入你的手机号码">';
        body += '</div>';
        body += '<label class="error none" id="msg_field_mobile"></label>';
        body += '</div>';
        body += '<div class="code_box clearfix">';
        body += '<div class="input-wrapper">';
        body += '<input type="text" class="form_input code pass_img fl_n" id="captcha" name="captcha" maxlength="4" valid-length="4|请输入4位图片验证码" placeholder="图片验证码">';
        body += '<div class="signCode"><img class="signCode" id="signCode" src="/user/captcha"/></div>';
        body += '</div>';
        body += '<label class="error none" id="msg_field_captcha"></label>';
        body += '</div>';
        body += '<div class="code_box clearfix">';
        body += '<div class="input-wrapper">';
        body += '<input type="text" class="form_input code pass_mobile_code fl_n" id="code" name="code" maxlength="4" valid-empty="true|手机验证码不能为空" valid-length="4|请输入4位手机验证码" placeholder="手机验证码">';
        body += '<a href="javascript:;" class="mobile_code" id="request-mobile-code-btn" usage="bind">获取手机验证码</a>';
        body += '</div>';
        body += '<label class="error none" id="msg_field_code"></label>';
        body += '</div>';
        body += '<input type="submit" class="submit red_btn" value="绑定手机" />';
        body += '<input type="hidden" name="ignore_sms" value="true" />';
        body += '<input type="hidden" name="callback" value="popup.close();" />';
        body += '<label class="error none" id="msg_field_default"></label>';
        body += '</form>';
        body += '</div>';
        // 增加跳转绑定链接
        body += '<p class="bind_mobile_link">手机已被绑定，可进行<a href="/user/rebind_account" title="合并账号" target="_blank">合并账号</a>。</p>'
        body += '</div>';
        this.show('你还没有绑定手机', body);
    },
    register: function() {
        var body = $('#register-template').html();
        this.show('', body);
    },
    draw: function(title, body, autoClose) {
        this.p = 1;
        var view = Mustache.render(this.template, {
            title: title,
            body: body
        });
        $('body').append(view);
        $('body').delegate('.popclose', 'click', function() {
            popup.close();
        }).delegate('.popmask', 'click', function() {
            popup.close();
        });
        user.checkCookie();
        this.adjust($('.popup'));
        /*  setTimeout(function() {
              $('.input-wrapper input').each(function() {
                  hideInputLabel($(this));
              });
          }, 120);*/
        if (autoClose !== false) {
            this.timer = setTimeout(function() {
                popup.close();
            }, autoClose);
        }
    },
    adjust: function(pop_obj) {
        var popup_margin_top = pop_obj.outerHeight() / 2;
        var popup_margin_left = pop_obj.outerWidth() / 2;
        pop_obj.css('margin-top', '-' + popup_margin_top + 'px');
        pop_obj.css('margin-left', '-' + popup_margin_left + 'px');
        if (mBrowser.isPC() == false) {
            var mFocus = 0;
            $('input').focus(function() {
                pop_obj.css({
                    'position': 'absolute',
                    'top': popup_margin_top + 'px',
                    'height': $(document).height()
                });
                if (mFocus == 0) {
                    $('html,body').scrollTop(0);
                    mFocus++;
                }
            });
            $('input').blur(function() {
                pop_obj.css({
                    'position': 'fixed',
                    'top': popup_margin_top + 'px',
                    'height': '100%'
                });
            });
        }
    },
    onClose: function(fn) {
        this.hooks.close.push(fn);
    },
    close: function() {
        if (this.p == 0) {
            return true;
        }
        this.p = 0;
        clearTimeout(this.timer);
        $('.popmask').remove();
        $('.popup').remove();
        if (this.hooks.close.length > 0) {
            $.each(this.hooks.close, function(i, fn) {
                fn();
            });
        };
    },
    show: function() {
        var title = arguments[0];
        var body = arguments[1];
        var autoClose = arguments[2] || false;
        this.close();
        this.draw(title, body, autoClose);
    },
    alert: function(msg) {
        this.show(title, msg, 3000);
    }
};
/*字数统计*/
var word_count = {
    length_objs: [],
    bind: function(input_obj, length_obj) {
        input_obj.keyup(function() {
            var length = $(this).val().replace('/[^/x00-/xff]/ig', 'x').length;
            length_obj.text(length);
        });
        this.length_objs.push(length_obj);
    },
    reset: function() {
        for (var i = 0; i < this.length_objs.length; i++) {
            this.length_objs[i].text(0);
        }
    }

};
ZUI.onReady(function() {
    user.checkCookie();

    $('a[active-class]').each(function() {
        if ($(this).attr('href') == window.location.pathname) {
            $(this).addClass($(this).attr('active-class'));
            return false;
        }
    });
    $('body').delegate('a.need-login', 'click', function(event) {
        if (!ZUI.user.id) {
            popup.login();
            return false;
        }
    });
    $('body').delegate('a.need-mobile', 'mousedown', function(event) {
        if (!ZUI.user.id) {
            popup.login();
            return false;
        }
        if (!ZUI.user.mobile) {
            popup.bindMobile();
            return false;
        }
    });
    $("body").delegate(".ajax-form", "submit", function(event) {
        event.preventDefault();
        var form = $(this),
            action = form.attr('action'),
            data = form.serialize();
        var submit_btn = form.find(':submit');
        if (submit_btn.hasClass('disabled')) {
            return false;
        }
        submit_btn.addClass('disabled');
        var dtext = submit_btn.val();
        submit_btn.val('提交中');
        $.ajax({
            type: 'POST',
            url: action,
            data: data,
            dataType: 'json'
        }).done(function(resp) {
            submit_btn.val(dtext);
            submit_btn.removeClass('disabled');
            if (typeof ajaxFormCallback == 'function') {
                ajaxFormCallback(resp);
            }
            if (!resp.status) {
                if (resp.field == undefined) {
                    resp.field = 'default';
                }
                $("#msg_field_" + resp.field).text(resp.msg).removeClass('none');
                return false;
            }
            if (resp.callback != undefined) {
                setTimeout(resp.callback, 0);
                return true;
            }
            if (resp.redirect != undefined) {
                window.location.href = resp.redirect;
                return true;
            }
        });
    });
    /*    setTimeout(function(){
            $('.input-wrapper input').each(function(){
                hideInputLabel($(this));
            });
        }, 120);

        $('body').delegate('.input-wrapper input', 'keyup', function(){
            hideInputLabel($(this));
        }).delegate('.input-wrapper input', 'keydown', function(){
            hideInputLabel($(this));
        }).delegate('.input-wrapper textarea', 'keyup', function(){
            hideInputLabel($(this));
        }).delegate('.input-wrapper textarea', 'keydown', function(){
            hideInputLabel($(this));
        });*/

    // 站内信
    if (ZUI.user.id != undefined) {
        mail();
        var timer = setInterval(function() {
            mail();
        }, 60000);
    };

    function mail() {
        $.ajax({
            type: 'POST',
            url: '/message/do_get_have_message',
            success: function(resp) {
                var resp = $.parseJSON(resp);
                if (resp.status) {
                    if (resp.msg) {
                        $('.mail').addClass('active');
                    } else {
                        $('.mail').removeClass('active');
                    }
                };
            }
        });
    };






});

/*function hideInputLabel(input){
    if(input.val() != ''){
        input.prev().addClass('hide');
    }else{
        input.prev().removeClass('hide');
    }
};*/

/*tips*/
;
(function($) {
    $.Tips = function(options) {
        var defaults = {
            code: 1,
            message: "操作成功",
            close: false
        }
        var options = $.extend(defaults, options);
        var ico = ["error", "success"];
        var box = $("<div class='inc_tips'><span></span>" + options.message + "</div>");
        $(".inc_tips").remove();
        $("body").append(box);
        $(".inc_tips").css({
            "marginLeft": -$(".inc_tips").outerWidth() / 2,
            "left": "50%"
        });
        /* $(".inc_tips").css("marginLeft", -($(".inc_tips").outerWidth() / 2));
         $(".inc_tips").css("left","50%");*/
        $(".inc_tips span").addClass(ico[options.code]);
        var anim = function() {
            box.animate({
                opacity: 0,
                top: "-50%"
            }, 300, function() {
                box.remove()
            });
        };
        box.on('click', anim);
        if (options.close != false) {
            setTimeout(anim, options.close);
        };
    }


})(jQuery)

$(function() {
    // $(".job_back_top").on('click', '.job_qq', function(event) {
    //     event.preventDefault();
    //     var url = "http://p.qiao.baidu.com//im/index?siteid=7844481&ucid=9837908"
    //     var myWindow = null;
    //     if (!myWindow || (myWindow && myWindow.closed)) {
    //         myWindow = window.open(url, "在线客服", "height=530, width=763,top=150%,left=50%,toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
    //     } else {
    //         myWindow.location.href = 'http://p.qiao.baidu.com//im/  index?siteid=7844481&ucid=9837908';
    //     }
    // });
    // 
    // 
    $('.job_back_top').on('click', '.job_qq', function(event) {
        event.preventDefault();
        zu_statistics.open();
    });

    /*返回顶部*/
    $('body').on("click", ".job_back_btn", function() {
        $('body,html').stop().animate({
            scrollTop: 0
        }, 600);
    });

    var floatTools = {

        show: function() {
            $(".job_back_top .wechat").addClass('hide');
            $(".job_back_er").removeClass('hide');
        },
        hide: function() {
            $(".job_back_er").addClass('hide');
            $(".job_back_top .wechat").removeClass('hide');
        }
    }
    if ($.cookie('wechatQC')) {
        floatTools.show()
    } else {
        floatTools.hide()
    }
    $('.job_back_er').on('click', 'a', function(event) {
        event.preventDefault();
        floatTools.hide()
        $.removeCookie('wechatQC', {
            path: '/'
        });
    });
    $('.wechat').on('click', 'a', function(event) {
        event.preventDefault();
        floatTools.show()
        $.cookie('wechatQC', 'false', {
            expires: 365,
            path: '/'
        });
    });
});
/*verify*/
var ZUI_verify = {
    rules: ['isMobile', 'isEmail', 'minLength', 'maxLength', 'length', 'isAsso', 'empty'],
    funcs: {
        failed: function(input, msg) {
            $('#msg_field_' + input.attr('name')).text(msg).removeClass('none');
        },
        success: function(input) {
            $('#msg_field_' + input.attr('name')).text('').addClass('none');
        }
    },
    setFailed: function(func) {
        this.funcs.failed = func;
    },
    setSuccess: function(func) {
        this.funcs.success = func;
    },
    isAsso: function(val) {
        if (this.isMobile(val) == true || this.isEmail(val) == true) {
            return true;
        }
        return false;
    },
    isMobile: function(val) {
        return /^1\d{10}$/.test(val);
    },
    isEmail: function(val) {
        return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(val);
    },
    minLength: function(val, min_length) {
        return new RegExp('^\\S{' + min_length + ',}$').test(val);
    },
    maxLength: function(val, max_length) {
        return new RegExp('^\\S{0,' + max_length + '}$').test(val);
    },
    length: function(val, length) {
        return new RegExp('^\\S{' + length + '}$').test(val);
    },
    content: function(attrs) {
        var errorArr = attrs.split('|');
        return errorArr;
    },
    isValid: function(input) {
        for (i = 0; i < this.rules.length; i++) {
            var func = this.rules[i];
            if (input.attr("valid-" + func) != undefined) {
                if (input.val() == '') {
                    var valid_empty = input.attr('valid-empty');
                    if (valid_empty != undefined && valid_empty != 'false') {
                        this.funcs.failed(input, this.content(valid_empty)[1]);
                        return false;
                    }
                } else {
                    if (func == 'isEmail') {
                        var result = this.isEmail(input.val());
                    } else if (func == 'isMobile') {
                        var result = this.isMobile(input.val());
                    } else if (func == 'minLength') {
                        var result = this.minLength(input.val(), this.content(input.attr("valid-" + func))[0]);
                    } else if (func == 'maxLength') {
                        var result = this.maxLength(input.val(), this.content(input.attr("valid-" + func))[0]);
                    } else if (func == 'length') {
                        var result = this.length(input.val(), this.content(input.attr("valid-" + func))[0]);
                    } else if (func == 'isAsso') {
                        var result = this.isAsso(input.val());
                    }
                    if (result == false) {
                        this.funcs.failed(input, this.content(input.attr("valid-" + func))[1]);
                        return false;
                    }
                }
            }
        }
        this.funcs.success(input);
        return true;
    }
};

/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-27 17:42:15
 * @version $Id$
 */


    initCell: function(cell) {
        var replys = cell.find('.reply-cell');
        var hide_something = false;
        $.each(replys, function(i) {
            if (i == 0) {
                return true;
            }
            $(this).addClass('hide');
            hide_something = true;
        });
        var opt_box = cell.find('.opt-box');
        if (hide_something) {
            opt_box.append(this.btn_show);
            cell.attr('fold', true);
        } else {
            cell.attr('fold', false);
        }
        if (cell.attr('user-id') == ZUI.user.id) {
            if (replys.length == 0) {
                return true;
            }
            var last_reply = replys.last();
            if (last_reply.attr('user-id') != ZUI.user.id) {
                opt_box.append(this.btn_reply);
                opt_box.find('.btn-reply').attr('ask-id', cell.attr('ask-id'));
            }
        }
    }

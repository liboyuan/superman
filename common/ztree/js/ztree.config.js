/* 
* @Author: sheak
* @Date:   2015-01-12 14:27:49
* @Last Modified by:   sheak
* @Last Modified time: 2015-01-30 15:04:10
*/
    // 公用数据格式转换，后台返回的数据建议先转换一下再使用
    var str2arr = function(str){
        var _arr = [];

        if(!str || str.length == 0){
            _arr = [];
        }else if( typeof str == "string"){
            _arr = eval("("+str+")");
        }else{
            _arr = str;
        }

        return _arr;
    }

    // 测试点击回调函数
    function onClick(e,treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.expandNode(treeNode);
    }


    /*
     * 获取已经选中的树叶节点，并更新到列表
     */

    // 查找自己的位置
    function DichotomySearch(arr , sort , high , low){
        var middle = high;

        // console.log("test:" + high , low , arr)
        if (high < low){
            middle = -1;
            return middle;
        }

        // console.log("middle:" + middle +"middleArr:"+ arr[middle] +"sort:"+ sort);
        if(parseInt(arr[middle]) > sort){
            return DichotomySearch(arr, sort, middle-1, low);
        }else if(parseInt(arr[middle]) == sort){
            return -99;
        }else{
            return middle;
        }
    }
    var newSortItem = function(tag){
        var _sortAr = [],
            _sortAr = $("#sortList li").map(function() {
                return $(this).attr(tag); 
            }).get();

        // console.log(_sortAr);
        return _sortAr;
    },  sortSelectNodes = function(treeNode){
        var _ele = $("#sortList"),
            _eleLi = _ele.find("li"),
            _eleLilen = _eleLi.length,
            _id = treeNode.id,
            _name = treeNode.name,  
            _cuSort = treeNode.sort ? treeNode.sort : 999,
            str = '<li class="dragSortMain" id="'+_id+'" sort="'+_cuSort+'">'+_name+' id:'+_id+'</li>';

        // 本地排重+排序，功能由后台执行
        //_sortAr = newSortItem("sort");

        //var insertIndex = DichotomySearch(_sortAr , _cuSort , _eleLilen-1 , 0);
        // console.log("index:"+insertIndex);

        // if(insertIndex == -1){
        //     $(_eleLi).eq(0).before(str);
        // }else if(insertIndex >= 0){
        //     $(_eleLi).eq(insertIndex).after(str);
        // }

        _ele.append(str);

    },  updateSelectNodes = function(zTree, treeNode){
        var nodes = zTree.getCheckedNodes(),  // 默认全部对象
            nodesArr = zTree.transformToArray(nodes),    // 数组格式
            str='';

        // 选中状态和取消选中状态
        if(treeNode.checked && treeNode.isParent == false){
            sortSelectNodes(treeNode);
        }else{
            var nodeId = treeNode.id;
            $("#"+nodeId).remove();
        }
    }

    // 点击按钮获取最新数据
    var getNewSort = function(){
        showLog(newSortItem("id"));
    }

    // checkbox 回调函数
    function zTreeOnCheck(e,treeId, treeNode){
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        updateSelectNodes(zTree, treeNode);
    }

    /*
     * 树节点复选框设置
     */
    function disabledNode(e) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        disabled = e.data.disabled,
        nodes = zTree.getSelectedNodes(),
        inheritParent = false, inheritChildren = false;
        if (nodes.length == 0) {
            alert("请先选择一个节点");
        }
        if (disabled) {
            inheritParent = $("#py").attr("checked");
            inheritChildren = $("#sy").attr("checked");
        } else {
            inheritParent = $("#pn").attr("checked");
            inheritChildren = $("#sn").attr("checked");
        }

        for (var i=0, l=nodes.length; i<l; i++) {
            zTree.setChkDisabled(nodes[i], disabled, inheritParent, inheritChildren);
        }
    }

    /*
     * 树节点拖动
     */
    function dropPrev(treeId, nodes, targetNode) {
        var pNode = targetNode.getParentNode();
        if (pNode && pNode.dropInner === false) {
            return false;
        } else {
            for (var i=0,l=curDragNodes.length; i<l; i++) {
                var curPNode = curDragNodes[i].getParentNode();
                if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false) {
                    return false;
                }
            }
        }
        return true;
    }
    function dropInner(treeId, nodes, targetNode) {
        if (targetNode && targetNode.dropInner === false) {
            return false;
        } else {
            for (var i=0,l=curDragNodes.length; i<l; i++) {
                if (!targetNode && curDragNodes[i].dropRoot === false) {
                    return false;
                } else if (curDragNodes[i].parentTId && curDragNodes[i].getParentNode() !== targetNode && curDragNodes[i].getParentNode().childOuter === false) {
                    return false;
                }
            }
        }
        return true;
    }
    function dropNext(treeId, nodes, targetNode) {
        var pNode = targetNode.getParentNode();
        if (pNode && pNode.dropInner === false) {
            return false;
        } else {
            for (var i=0,l=curDragNodes.length; i<l; i++) {
                var curPNode = curDragNodes[i].getParentNode();
                if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false) {
                    return false;
                }
            }
        }
        return true;
    }


    // 调用后台接口默认知识点显示
    var initDominant = function(d){
        var _itemObj = str2arr(d),
            _itemArr = _itemObj.msg,
            _itemLen = _itemArr.length,
            _itemName = _itemArr.name,
            _itemStr = "";

        for( var i = 0; i < _itemLen; i++){
            var _id = _itemArr[i].id,
                _name = _itemArr[i].name;

            _itemStr += '<li id="'+_id+'" style="cursor: pointer;">'+_name+'</li>';
        }

        return _itemStr;
    },  showDominant = function(ele){
        var _ele = ele,
            _url = "http://changzhongqing.v2.51zhishang-d.com/admin/keypoint/do_get_primeKeypoint?subject_id=1";

        $.ajax({
            url : _url,
            type : "GET",
            success : function(d){
                // 处理后台数据
                var _itemStr = initDominant(d);
                $(ele).html(_itemStr);
            },
            error : function(){
                console.log("ERROR");
            }
        })
    }
    //showDominant("#ajaxStr ul#sortList");





    /**************************************************/
    var log, className = "dark", curDragNodes, autoExpandNode;
    function beforeDrag(treeId, treeNodes) {
        className = (className === "dark" ? "":"dark");
        showLog("[ "+getTime()+" beforeDrag ]&nbsp;&nbsp;&nbsp;&nbsp; drag: " + treeNodes.length + " nodes." );
        for (var i=0,l=treeNodes.length; i<l; i++) {
            if (treeNodes[i].drag === false) {
                curDragNodes = null;
                return false;
            } else if (treeNodes[i].parentTId && treeNodes[i].getParentNode().childDrag === false) {
                curDragNodes = null;
                return false;
            }
        }
        curDragNodes = treeNodes;
        return true;
    }
    function beforeDragOpen(treeId, treeNode) {
        autoExpandNode = treeNode;
        return true;
    }
    function beforeDrop(treeId, treeNodes, targetNode, moveType, isCopy) {
        className = (className === "dark" ? "":"dark");
        showLog("[ "+getTime()+" beforeDrop ]&nbsp;&nbsp;&nbsp;&nbsp; moveType:" + moveType);
        showLog("target: " + (targetNode ? targetNode.name : "root") + "  -- is "+ (isCopy==null? "cancel" : isCopy ? "copy" : "move"));
        return true;
    }
    function onDrag(event, treeId, treeNodes) {
        className = (className === "dark" ? "":"dark");
        showLog("[ "+getTime()+" onDrag ]&nbsp;&nbsp;&nbsp;&nbsp; drag: " + treeNodes.length + " nodes." );
    }
    function onDrop(event, treeId, treeNodes, targetNode, moveType, isCopy) {
        className = (className === "dark" ? "":"dark");
        showLog("[ "+getTime()+" onDrop ]&nbsp;&nbsp;&nbsp;&nbsp; moveType:" + moveType);
        showLog("target: " + (targetNode ? targetNode.name : "root") + "  -- is "+ (isCopy==null? "cancel" : isCopy ? "copy" : "move"))
    }
    function onExpand(event, treeId, treeNode) {
        if (treeNode === autoExpandNode) {
            className = (className === "dark" ? "":"dark");
            showLog("[ "+getTime()+" onExpand ]&nbsp;&nbsp;&nbsp;&nbsp;" + treeNode.name);
        }
    }

    function showLog(str) {
        if (!log) log = $("#log");
        log.append("<li class='"+className+"'>"+str+"</li>");
        if(log.children("li").length > 8) {
            log.get(0).removeChild(log.children("li")[0]);
        }
    }
    function getTime() {
        var now= new Date(),
        h=now.getHours(),
        m=now.getMinutes(),
        s=now.getSeconds(),
        ms=now.getMilliseconds();
        return (h+":"+m+":"+s+ " " +ms);
    }

    // 拖动到节点是否展开
    function setTrigger() {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.setting.edit.drag.autoExpandTrigger = $("#callbackTrigger").attr("checked");
    }


    /*
     * 增 删 改 节点
     */
    function beforeRemove(treeId, treeNode) {
        className = (className === "dark" ? "":"dark");
        showLog("[ "+getTime()+" beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
        return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
    }
    function onRemove(e, treeId, treeNode) {
        showLog("[ "+getTime()+" onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
    }
    function beforeRename(treeId, treeNode, newName) {
        if (newName.length == 0) {
            alert("节点名称不能为空.");
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            setTimeout(function(){zTree.editName(treeNode)}, 10);
            return false;
        }
        return true;
    }
    var newCount = 1;
    function add(e) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        isParent = e.data.isParent,
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];
        if (treeNode) {
            treeNode = zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, isParent:isParent, name:"new node" + (newCount++)});
        } else {
            treeNode = zTree.addNodes(null, {id:(100 + newCount), pId:0, isParent:isParent, name:"new node" + (newCount++)});
        }
        if (treeNode) {
            zTree.editName(treeNode[0]);
        } else {
            alert("叶子节点被锁定，无法增加子节点");
        }
    };
    function edit() {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];
        if (nodes.length == 0) {
            alert("请先选择一个节点");
            return;
        }
        zTree.editName(treeNode);
    };
    function remove(e) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];
        if (nodes.length == 0) {
            alert("请先选择一个节点");
            return;
        }
        var callbackFlag = $("#callbackTrigger").attr("checked");
        zTree.removeNode(treeNode, callbackFlag);
    };
    function clearChildren(e) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];
        if (nodes.length == 0 || !nodes[0].isParent) {
            alert("请先选择一个父节点");
            return;
        }
        zTree.removeChildNodes(treeNode);
    };


    /*
     * 显示/隐藏选中节点
     */
    function setTitle(node) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        var nodes = node ? [node]:zTree.transformToArray(zTree.getNodes());
        for (var i=0, l=nodes.length; i<l; i++) {
            var n = nodes[i];
            n.title = "[" + n.id + "] isFirstNode = " + n.isFirstNode + ", isLastNode = " + n.isLastNode;
            zTree.updateNode(n);
        }
    }
    function showNodes() {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getNodesByParam("isHidden", true);
        zTree.showNodes(nodes);
        setTitle();
        //count();
    }
    function hideNodes() {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getSelectedNodes();
        if (nodes.length == 0) {
            alert("请至少选择一个节点");
            return;
        }
        zTree.hideNodes(nodes);
        setTitle();
        //count();
    }


    /*
     * 异步加载
     */
    function filter(treeId, parentNode, childNodes) {
        if (!childNodes) return null;
        for (var i=0, l=childNodes.length; i<l; i++) {
            childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
        }
        return childNodes;
    }
    function beforeClick(treeId, treeNode) {
        if (!treeNode.isParent) {
            alert("请选择父节点");
            return false;
        } else {
            return true;
        }
    }
    var log, className = "dark";
    function beforeAsync(treeId, treeNode) {
        className = (className === "dark" ? "":"dark");
        showLog("[ "+getTime()+" beforeAsync ]&nbsp;&nbsp;&nbsp;&nbsp;" + ((!!treeNode && !!treeNode.name) ? treeNode.name : "root") );
        return true;
    }
    function onAsyncError(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
        showLog("[ "+getTime()+" onAsyncError ]&nbsp;&nbsp;&nbsp;&nbsp;" + ((!!treeNode && !!treeNode.name) ? treeNode.name : "root") );
    }
    function refreshNode(e) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        type = e.data.type,
        silent = e.data.silent,
        nodes = zTree.getSelectedNodes();
        if (nodes.length == 0) {
            alert("请先选择一个父节点");
        }
        for (var i=0, l=nodes.length; i<l; i++) {
            zTree.reAsyncChildNodes(nodes[i], type, silent);
            if (!silent) zTree.selectNode(nodes[i]);
        }
    }


    /*
     * 搜索节点
     */
    function focusKey(e) {
        if (key.hasClass("empty")) {
            key.removeClass("empty");
        }
    }
    function blurKey(e) {
        if (key.get(0).value === "") {
            key.addClass("empty");
        }
    }
    var lastValue = "", nodeList = [], fontCss = {};
    function clickRadio(e) {
        lastValue = "";
        searchNode(e);
    }
    function searchNode(e) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        if (!$("#getNodesByFilter").attr("checked")) {
            var value = $.trim(key.get(0).value);
            var keyType = "";
            if ($("#name").attr("checked")) {
                keyType = "name";
            } else if ($("#level").attr("checked")) {
                keyType = "level";
                value = parseInt(value);
            } else if ($("#id").attr("checked")) {
                keyType = "id";
                value = parseInt(value);
            }
            if (key.hasClass("empty")) {
                value = "";
            }
            if (lastValue === value) return;
            lastValue = value;
            if (value === "") return;
            updateNodes(false);

            if ($("#getNodeByParam").attr("checked")) {
                var node = zTree.getNodeByParam(keyType, value);
                if (node === null) {
                    nodeList = [];
                } else {
                    nodeList = [node];
                }
            } else if ($("#getNodesByParam").attr("checked")) {
                nodeList = zTree.getNodesByParam(keyType, value);
            } else if ($("#getNodesByParamFuzzy").attr("checked")) {
                nodeList = zTree.getNodesByParamFuzzy(keyType, value);
            }
        } else {
            updateNodes(false);
            nodeList = zTree.getNodesByFilter(filter);
        }
        updateNodes(true);

    }
    function updateNodes(highlight) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        for( var i=0, l=nodeList.length; i<l; i++) {
            nodeList[i].highlight = highlight;
            zTree.updateNode(nodeList[i]);
        }
    }
    function getFontCss(treeId, treeNode) {
        return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
    }


    /*
     * 获得全部显性树
     */
    function onAsyncSuccess(event, treeId, treeNode, msg) {
        //showLog("[ "+getTime()+" onAsyncSuccess ]&nbsp;&nbsp;&nbsp;&nbsp;" + ((!!treeNode && !!treeNode.name) ? treeNode.name : "root") );
    }


    function showAllJson(){
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
            nodes = zTree.getCheckedNodes(),  // 默认全部对象
            nodesArr = zTree.transformToArray(nodes),    // 数组格式
            nodesJson = JSON.stringify(nodes),  // JSON格式
            str='';
        // console.log(nodes.length)
        for(var i=0;i<nodes.length;i++){
            var checkSta = nodes[i].getCheckStatus().checked,
                dominant = nodes[i].dominant;
            if(checkSta == true && dominant == true){
                str+="'"+nodes[i].id+"',";
            }
        }
        // 获取全部json对象
        //console.log(str);
        showLog(str);
    }

    /*
     * diy按钮
     */
    function addDiyDom(treeId, treeNode) {
        //console.log(treeNode)
        var IDMark_A = "_a",
            aObj = $("#" + treeNode.tId + IDMark_A),
            zTree = $.fn.zTree.getZTreeObj("treeDemo");

        // 只给显性参数设置编辑按钮
        // var editStr = "<span class='demoIcon' id='diyBtn_" +treeNode.id+ "' title='"+treeNode.name+"' onfocus='this.blur();'>编辑</span>";
        var editStr = "<a id='diyBtn_" +treeNode.id+ "' title='"+treeNode.name+"'>编辑</a>";
        if(treeNode.dominant == true || treeNode.dominant == "true"){
            //console.log(treeNode.id)
            aObj.append(editStr);
        }

        var btn = $("#diyBtn_"+treeNode.id);
        if (btn) {
            btn.bind("click", function(){
                var clickUrl = treeNode.api;
                console.log(clickUrl)
                $("#loadUrl iframe").attr("src" , clickUrl)
            });
        }
    }

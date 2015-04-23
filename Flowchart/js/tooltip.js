jsPlumb.ready(function() {
    var i = 0;
    $(".drag").draggable({
        helper: 'clone',
        containment: '#flow',
        stop: function (ev, ui) {
            var pos = $(ui.helper).offset();
            objName = "#clonediv" +i
            $(objName).css({
                "left": pos.left,
                "top": pos.top
            });
            $(objName).removeClass("drag");
        },
        grid : [25,25]
    });
    $("#flowchart").droppable({
        drop: function (ev, ui) {
            i++
            var element = $(ui.draggable).clone();
            element.addClass("tempclass");
            $(this).append(element);
            $(".tempclass").attr("id", "clonediv" +i);
            $("#clonediv"+i).removeClass("tempclass");
            if($("#clonediv"+i).hasClass('if')){
                setIf(element);
            } else if($("#clonediv"+i).hasClass('begin')){
                setBegin(element);
            } else if($("#clonediv"+i).hasClass('end')){
                setEnd(element);
            } else {
                setAction(element);
            }
            $("#clonediv"+i).attr("class","window");
            update(element);
            
        }
    });

});
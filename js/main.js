var arr = [], box, i, j, element_i, element_j;
function swap(arr, i1, j1, i2, j2) {
    let tmp = arr[i1][j1];
    arr[i1][j1] = arr[i2][j2];
    arr[i2][j2] = tmp;
}

function ifWin() {
    var q = true;
    for (i = 0; i < 4; ++i)
        for (j = 0; j < 4; ++j)
            if (i + j != 6 && $("#" + i + "_" + j).text() != i * 4 + j + 1) {
                q = false;
                break;
            }
    if (q) alert("Перемога!");
}

$(document).ready(function () {
    box = $("#box");
    newGame();
    $("#reset").click(newGame);
});

function newGame() {
    for (i = 0; i < 4; ++i) {
        arr[i] = []
        for (j = 0; j < 4; ++j) {
            if (i + j == 6) {
                arr[i][j] = "0";
            } else arr[i][j] = i * 4 + j + 1;
        }
    }
    element_i = 3;
    element_j = 3;
    for (i = 0; i < 500 * (Math.round(2 * Math.random()) + 1); ++i)
        switch (Math.round(3 * Math.random())) {
            case 0:
                if (element_i != 0) swap(arr, element_i, element_j, --element_i, element_j);
                break; // В верх
            case 1:
                if (element_j != 3) swap(arr, element_i, element_j, element_i, ++element_j);
                break; // В право
            case 2:
                if (element_i != 3) swap(arr, element_i, element_j, ++element_i, element_j);
                break; // В низ
            case 3:
                if (element_j != 0) swap(arr, element_i, element_j, element_i, --element_j);
                break;// В ліво
        }
    var div = $("<div class='container'></div>");
    for (i = 0; i < 4; ++i) {
        var row = $("<div class='row'></div>");
        for (j = 0; j < 4; ++j) {
            var cell = $("<div class='col-xs-3 drag droppable cv'id = \"" + i + "_" + j + "\"></div>");
            cell.text(arr[i][j]);
            if (arr[i][j] == 0) {
                cell.addClass("transparent");
            }
            var div1 = $("<div class='col-xs-3 pad' ></div>");
            div1.append(cell);
            row.append(div1);
        }
        div.append(row);
    }
    if (box.children().length == 1)
        box.children(".container").remove();
    box.append(div);
    $(".drag").draggable({
        //helper: "clone",
        revert: true,
        containment: ".container",
        scroll: false
    });
    //$(".droppable").draggable({ disabled: true });
    $(".droppable").droppable({
            drop: function (event, ui) {
                var clone = ui.draggable.clone();
                console.log(ui.position);

                var i = parseInt(clone.attr('id').charAt(0)),
                    j = parseInt(clone.attr('id').charAt(2)),
                    i_this = parseInt($(this).attr('id').charAt(0)),
                    j_this = parseInt($(this).attr('id').charAt(2));
                if ((i == i_this && (j == j_this - 1 || j == j_this + 1)) || (j == j_this && (i == i_this - 1 || i == i_this + 1))) {
                    $(this).text(clone.text()).draggable('enable').droppable("disable").removeClass("transparent");
                    $("#" + clone.attr('id')).text("0").draggable('disable').droppable("enable").addClass("transparent");
                    //$(this).css("position","absolute");
                    var left, top;
                    if (j == j_this) {
                        left = ui.position.left;
                        if (i == i_this - 1) top = ui.position.top - 81;
                        else top = ui.position.top + 81;
                    } else {
                        top = ui.position.top;
                        if (j == j_this - 1) left = ui.position.left - 70;
                        else left = ui.position.left + 70;
                    }
                    $(this).css("left", left + "px");
                    $(this).css("top", top + "px");
                    //console.log($(this).css("left"));
                    $(this).animate({left: 0, top: 0}, 500);
                    //$(this).animate({top: 0}, 500);
                    /*while (left != 0) {
                     if (left > 0) {
                     left--;
                     $(this).css("left", left + "px");
                     } else {
                     left++;
                     $(this).css("left", left + "px");
                     }
                     }*/
                    ifWin();
                }
            }
        }
    )
    ;
    for (i = 0; i < 4; ++i) {
        for (j = 0; j < 4; ++j) {
            if (arr[i][j] == "0") {
                $("#" + i + "_" + j).draggable('disable');
            } else {
                $("#" + i + "_" + j).droppable('disable');
            }
        }
    }
}
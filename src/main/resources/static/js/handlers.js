function updateTree() {
    $('.tree .ui-draggable').draggable('destroy');

    $('.tree span').unbind().on('click', function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $('.tree span').removeClass("active");
            $(this).addClass("active");
        }
    }).draggable({
        containment: ".tree",
        snap: true,
        snapMode: 'inner',
        revert: 'invalid'
    }).droppable({
        drop: function (event, ui) {
            moveNode(ui.draggable, $(this));
        }
    });

    $('.tree .parent_li > span').on('dblclick', function (e) {
        let children = $(this).parent().find('> ul');
        let id = $(this).parent().val();

        if (children[0].childElementCount !== 0) {
            children.empty();
        } else {
            downloadChildren(children, id);
        }
    });
}

function createClick() {
    let active = $('.tree .active');

    let id = 0;

    if (active.length !== 0) {
        id = active.parent().val();
    } else {
        let root = $('.tree > ul > li > span');

        if (root.hasClass("active")) {
            root.removeClass("active");
        }
    }

    let dialog = valueDialog.modal('show');
    dialog.find('.modal-title').text('Create');
    dialog.find('.modal-body input').val("");
    dialog.find('#applyValueDialog').attr("onclick", "createNode(" + id + ")");
}

function updateClick() {
    let active = $('.tree .active');

    if (active.length === 0) {
        showNoty("Selected folder or file", "info");
        return;
    }

    let id = active.parent().val();

    if (id === 0) {
        showNoty("Impossible update root!", "error");
        return;
    }

    let name = active.text().replace(/ /g, '');

    let dialog = valueDialog.modal('show');
    dialog.find('.modal-title').text('Update');
    dialog.find('.modal-body input').val(name);
    dialog.find('#applyValueDialog').attr("onclick", "updateNode(" + id + ")");
}

function deleteClick() {
    let active = $('.tree .active');

    if (active.length === 0) {
        showNoty("Selected folder or file", "info");
        return;
    }

    let id = active.parent().val();

    if (id === 0) {
        showNoty("Impossible delete root!", "error");
        return;
    }

    let name = active.text().replace(/ /g, '');

    let dialog = deleteDialog.modal('show');
    dialog.find('p').text("Do you want remove '" + name + "'?");
    dialog.find('#applyDeleteDialog').attr("onclick", "removeNode(" + id + ")");
}
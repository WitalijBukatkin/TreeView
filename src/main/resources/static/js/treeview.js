/*
 * Copyright (c) 2020. Witalij Bukatkin
 * Github profile: https://github.com/witalijbukatkin
 */

function displayNode(node) {
    if (node == null) {
        return "";
    }

    if (node.hasChild) {
        return "<li class='parent_li' value='" + node.id + "'>" +
            "<span><i class=\"fa fa-folder-open\"></i> " + node.value + " </span>" +
            "<ul></ul>" +
            "</li>";
    } else {
        return "<li value='" + node.id + "'>" +
            "<span><i class=\"fa fa-file\"></i> " + node.value + " </span>" +
            "</li>";
    }
}

function getRootNode() {
    $.get('/ajax/nodes', function (nodes) {
        tree.empty()
            .append(displayNode(nodes));

        updateTree();
    }, 'json');
}

function downloadChildren(root, id) {
    $.get('/ajax/nodes/' + id, async function (nodes) {

        root.append("</br><i class='fa fa-spinner'></i>");

        let value = "";

        $.each(nodes, function (index, each) {
            value += displayNode(each);
        });

        await new Promise(resolve => setTimeout(resolve, 2000));

        root.empty();

        root.append(value);

        updateTree();
    }, 'json');
}

function onSuccessUpdateNode() {
    let active = $('.tree .active').parent();

    let topUl = active.parent();
    let topId = topUl.parent().val();

    downloadChildren(topUl, topId);
}

function createNode(id) {
    let value = valueDialog.find("input").val();

    if (value === "") {
        showNoty('Value is empty!', 'error');
        return;
    }

    $.post('/ajax/nodes/' + id, {value: value}, function () {
        let active = $('.tree .active').parent();

        if (!active.hasClass('parent_li')) {
            active.addClass('parent_li');

            let text = active.text();
            active.empty();
            active.append("<span><i class=\"fa fa-folder-open\"></i>" + text + "</span><ul></ul>");
        }

        downloadChildren(active.find('> ul'), active.val());
    }).fail(function () {
        showNoty('Error creating', 'error');
    });

    valueDialog.modal('hide');
}

function updateNode(id) {
    let value = valueDialog.find("input").val();

    if (value === "") {
        showNoty('Value is empty!', 'error');
        return;
    }

    $.ajax({
        type: 'put',
        url: '/ajax/nodes/' + id,
        data: {value: value},
        success: onSuccessUpdateNode,
        fail: function () {
            showNoty('Error updating', 'error');
        }
    });

    valueDialog.modal('hide');
}

function removeNode(id) {
    $.ajax({
        type: 'delete',
        url: '/ajax/nodes/' + id,
        success: onSuccessUpdateNode,
        fail: function () {
            showNoty('Error deleting', 'error');
        }
    });

    deleteDialog.modal('hide');
}

function moveNode(draggable, target) {
    let id = draggable.parent().val();
    let toId = target.parent().val();

    if (id === 0) {
        showNoty("Draggable is root!", 'error');
        getRootNode();
        return;
    }

    $.post('/ajax/nodes/' + id + "/move/to/" + toId, function () {
        let parentTopDraggable = draggable.parent().parent();

        downloadChildren(parentTopDraggable, parentTopDraggable.parent().val());

        let parentTarget = target.parent();

        if (!parentTarget.hasClass('parent_li')) {
            parentTarget.addClass('parent_li');

            let text = parentTarget.text();
            parentTarget.empty();
            parentTarget.append("<span><i class=\"fa fa-folder-open\"></i>" + text + "</span><ul></ul>");
        }

        downloadChildren(parentTarget.find('> ul'), toId);
    }).fail(function () {
        showNoty('Error moving', 'error');
    });
}
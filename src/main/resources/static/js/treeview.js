let tree = $('.tree').find("> ul");

let valueDialog = $("#valueDialog");
let deleteDialog = $("#deleteDialog");

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
        return "<li value='" + node.id + "'><span><i class=\"fa fa-file\"></i> " + node.value + " </span></li>";
    }
}

function getRootNode() {
    tree.empty();
    downloadNode(tree, 0);
}

function downloadNode(root, id) {
    $.get('/ajax/nodes/' + id, function (nodes) {
        root.empty();
        root.append(displayNode(nodes));
        updateTree();
    }, 'json');
}

function downloadChildren(root, id) {
    $.get('/ajax/nodes/' + id + "/children", async function (nodes) {
        root.empty();

        let value = "";

        $.each(nodes, function (index, each) {
            value += displayNode(each);
        });

        //TODO: enable this
        //await new Promise(resolve => setTimeout(resolve, 2000));

        root.append(value);

        updateTree();
    }, 'json');
}

function onSuccessCreateNode() {
    let active = $('.tree .active').parent();

    if (!active.hasClass('parent_li')) {
        active.addClass('parent_li');

        let text = active.text();
        active.empty();
        active.append("<span><i class=\"fa fa-folder-open\"></i>" + text + "</span><ul></ul>");
    }

    downloadChildren(active.find('> ul'), active.val());
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

    $.post('/ajax/nodes/' + id, {value: value}, onSuccessCreateNode)
        .fail(function () {
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

function moveNode() {
    //TODO: Not implemented!
}
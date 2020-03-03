let nodes1;

let tree = $('.tree').find("> ul");

function getNodes() {
    $.get('/ajax/nodes', function (nodes) {
        tree.empty();

        if (nodes == null) {
            tree.append("<h2>Empty list</h2>")
        }

        tree.append(createNode(nodes));

        initTree();
    }, 'json');
}

function createNode(node) {
    if (node.children !== null) {
        let root = "<li><span><i class=\"fa fa-folder-open\"></i> " + node.value + " </span><ul>";
        $.each(node.children, function (index, each) {
            if (each != null) {
                root += createNode(each);
            }
        });
        return root + "</li></ul>";
    } else {
        return "<li><span> " + node.value + " </span></li>";
    }
}
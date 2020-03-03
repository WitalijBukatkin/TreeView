$(function () {
    initTree();
});

function initTree() {
    $('.tree li:has(ul)')
        .addClass('parent_li')
        .find(' > span')
        .attr('title', 'Open folder');

    $('.tree li.parent_li > span').on('click', function (e) {
        let children = $(this)
            .parent()
            .find(' > ul > li');

        if (children.is(":visible")) {
            children.hide('fast');

            $(this).attr('title', 'Expand this branch')
                .find(' > i')
                .addClass('fa-plus-square')
                .removeClass('fa-minus-square');
        } else {
            children.show('fast');
            $(this).attr('title', 'Collapse this branch')
                .find(' > i')
                .addClass('fa-minus-square')
                .removeClass('fa-plus-square');
        }
        e.stopPropagation();
    });

    $('.tree span').parent().find('li').hide('fast');
}
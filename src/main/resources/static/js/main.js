$(function () {
    getRootNode();
});

function showNoty(text, type) {
    new Noty({
        text: "<span class='fa fa-lg fa-check'></span> &nbsp;" + text,
        type: type,
        layout: "top",
        timeout: 1000
    }).show();
}
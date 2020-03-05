/*
 * Copyright (c) 2020. Witalij Bukatkin
 * Github profile: https://github.com/witalijbukatkin
 */

let tree = $('.tree').find("> ul");

let valueDialog = $("#valueDialog");
let deleteDialog = $("#deleteDialog");

$(function () {
    getRootNode();
});

function showNoty(text, type) {
    new Noty({
        text: text,
        type: type,
        layout: "top",
        timeout: 1000
    }).show();
}

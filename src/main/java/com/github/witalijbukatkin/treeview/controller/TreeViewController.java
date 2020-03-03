package com.github.witalijbukatkin.treeview.controller;

import com.github.witalijbukatkin.treeview.model.Node;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/ajax/nodes", produces = MediaType.APPLICATION_JSON_VALUE)
public class TreeViewController {

    private Logger log = LoggerFactory.getLogger(this.getClass());

    private Node node;

    {
        Node node1 = new Node("vitalijbukatkin");
        Node node2 = new Node("home", new ArrayList<>(List.of(node1)));
        Node node3 = new Node("etc");

        node = new Node("/", new ArrayList<>(List.of(node2, node3)));
    }

    @GetMapping
    public Node getAll() {
        log.info("getAll");
        return node;
    }

}

package com.github.witalijbukatkin.treeview.controller;

import com.github.witalijbukatkin.treeview.model.Node;
import com.github.witalijbukatkin.treeview.repository.NodeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = TreeViewController.REST_URL, produces = MediaType.APPLICATION_JSON_VALUE)
public class TreeViewController {
    private Logger log = LoggerFactory.getLogger(this.getClass());

    public static final String REST_URL = "/ajax/nodes";

    @Autowired
    private NodeRepository repository;

    @GetMapping
    public Node getRoot() {
        log.info("get from root");
        return repository.get(0);
    }

    @GetMapping("{id}")
    public List<Node> get(@PathVariable int id) {
        log.info("get of {}", id);
        return repository.get(id).getChildren();
    }

    @PostMapping("{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Node> create(@PathVariable int id, @RequestParam String value) {
        log.info("create of {} and value {}", id, value);

        Node node = repository.create(id, value);

        URI uriOfNewResource = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path(REST_URL + "/" + node.getId())
                .build().toUri();

        return ResponseEntity.created(uriOfNewResource).body(node);
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@PathVariable int id, @RequestParam String value) {
        log.info("update of {} and value {}", id, value);
        repository.update(id, value);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remove(@PathVariable int id) {
        log.info("remove {}", id);
        repository.delete(id);
    }

    @PostMapping("{id}/move/to/{toId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void move(@PathVariable int id, @PathVariable int toId) {
        log.info("move {} to {}", id, toId);
        repository.move(id, toId);
    }
}

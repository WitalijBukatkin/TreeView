/*
 * Copyright (c) 2020. Witalij Bukatkin
 * Github profile: https://github.com/witalijbukatkin
 */

package com.github.witalijbukatkin.treeview.repository;

import com.github.witalijbukatkin.treeview.model.Node;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class NodeRepository {
    @Autowired
    private CrudNodeRepository repository;

    public Node create(int parentId, String value) {
        Node parent = get(parentId);

        Node node = new Node(parent, value);

        parent.getChildren().add(node);

        return repository.save(node);
    }

    public Node update(int id, String value) {
        Node node = get(id);

        node.setValue(value);

        return repository.save(node);
    }

    public Node get(int id) {
        return repository.findById(id).get();
    }

    public void delete(int id) {
        Node node = get(id);
        Node parent = node.getParent();

        if (parent != null) {
            parent.getChildren().remove(node);
        }

        repository.delete(node);
    }

    public void move(int id, int toId) {
        Node node = get(id);

        Node oldParent = node.getParent();
        if (oldParent != null) {
            oldParent.getChildren().remove(node);
        }

        Node newParent = get(toId);
        newParent.getChildren().add(node);

        node.setParent(newParent);

        repository.save(node);
    }
}

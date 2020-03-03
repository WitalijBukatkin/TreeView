package com.github.witalijbukatkin.treeview.dao;

import com.github.witalijbukatkin.treeview.model.Node;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Repository
public class NodeDao {
    private Node node;

    private AtomicInteger integer = new AtomicInteger();

    {
        node = new Node(null, integer.getAndIncrement(), "/");

        Node node2 = new Node(node, integer.getAndIncrement(), "home");
        Node node1 = new Node(node2, integer.getAndIncrement(), "vitalijbukatkin");

        Node node3 = new Node(node, integer.getAndIncrement(), "etc");

        node.getChildren().addAll(List.of(node2, node3));
        node2.getChildren().addAll(List.of(node1));
    }

    public Node get(int id) {
        return get(node, id);
    }

    public Node get(Node node, int id) {
        if (node.getId() == id) {
            return node;
        }

        if (node.getChildren() != null) {
            for (Node child : node.getChildren()) {

                if (child != null) {
                    Node found = get(child, id);

                    if (found != null) {
                        return found;
                    }
                }
            }
        }

        return null;
    }

    public Node create(int rootId, String value) {
        Node node = get(rootId);

        if (node != null) {
            Node child = new Node(node, integer.getAndIncrement(), value);

            node.getChildren().add(child);

            return child;
        }

        return null;
    }

    public void update(int id, String value) {
        Node node = get(id);

        if (node != null) {
            node.setValue(value);
        }
    }

    public void remove(int id) {
        Node node = get(id);

        if (node != null && node.getParent() != null) {
            node.getParent().getChildren().remove(node);
        }
    }

    public void move(int id, int toId) {
        Node node = get(id);

        if (node != null && node.getParent() != null) {
            node.getParent().getChildren().remove(node);

            Node newNode = get(toId);

            if (newNode != null) {
                newNode.getChildren().add(node);
            }
        }
    }
}

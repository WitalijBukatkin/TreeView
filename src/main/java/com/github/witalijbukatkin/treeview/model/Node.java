package com.github.witalijbukatkin.treeview.model;

import java.util.List;

public class Node {
    private Integer id;

    private String value;

    private List<Node> children;

    public Node(Integer id, String value, List<Node> children) {
        this.id = id;
        this.value = value;
        this.children = children;
    }

    public Node(String value, List<Node> children) {
        this.value = value;
        this.children = children;
    }

    public Node(String value) {
        this.value = value;
    }

    public Node() {
    }

    public void addChild(Node node) {
        if (children != null) {
            children.add(node);
        }
    }

    public void removeChild(int id) {
        if (children.size() > id) {
            children.remove(id);
        }
    }

    public void removeChild(Node node) {
        if (children != null) {
            children.remove(node);
        }
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public List<Node> getChildren() {
        return children;
    }

    public void setChildren(List<Node> children) {
        this.children = children;
    }
}

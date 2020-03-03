package com.github.witalijbukatkin.treeview.model;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

public class Node {
    private Integer id;

    @JsonIgnore
    private Node parent;

    private String value;

    @JsonIgnore
    private List<Node> children;

    public Node(Node parent, Integer id, String value, List<Node> children) {
        this.parent = parent;
        this.id = id;
        this.value = value;
        this.children = children;
    }

    public Node(Node parent, Integer id, String value) {
        this(parent, id, value, new ArrayList<>());
    }

    public Node(Node parent, String value, List<Node> children) {
        this(parent, null, value, children);
    }

    public Node(Node parent, String value) {
        this(parent, null, value);
    }

    public Node() {
        this(null, null);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Node getParent() {
        return parent;
    }

    public void setParent(Node parent) {
        this.parent = parent;
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

    @JsonGetter
    public boolean hasChild() {
        return !children.isEmpty();
    }
}

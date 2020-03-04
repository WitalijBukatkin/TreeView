package com.github.witalijbukatkin.treeview.repository;

import com.github.witalijbukatkin.treeview.model.Node;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrudNodeRepository extends JpaRepository<Node, Integer> {

}

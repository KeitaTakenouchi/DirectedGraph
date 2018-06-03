import "mocha";
import { assert } from "chai";
import { DirectedGraph } from '../src/directedGraph';
import { arrays } from 'typescript-collections';

describe("Directed Graph Class",
    function () {
        let graph = new DirectedGraph();
        graph.addEdge(1, 2);
        graph.addEdge(1, 3);
        graph.addEdge(1, 3);
        graph.addEdge(2, 4);
        graph.addEdge(3, 5);
        graph.addEdge(3, 6);
        graph.addEdge(5, 5);

        it("should return a correct node size of the graph",
            function () {
                assert(6 == graph.getNodeCount());
            }
        );

        it("should return a correct edge size of the graph",
            function () {
                assert(6 == graph.getEdgeCount());
            }
        );

        it("should return a correct successors",
            function () {
                {
                    let ss = graph.getSuccessor(1);
                    assert(arrays.contains(ss, 2));
                    assert(arrays.contains(ss, 3));
                    assert(2 == ss.length);
                }
                {
                    let ss = graph.getSuccessor(2);
                    assert(arrays.contains(ss, 4));
                    assert(1 == ss.length);
                }
                {
                    let ss = graph.getSuccessor(3);
                    assert(arrays.contains(ss, 5));
                    assert(arrays.contains(ss, 6));
                    assert(2 == ss.length);
                }
                {
                    let ss = graph.getSuccessor(5);
                    assert(arrays.contains(ss, 5));
                    assert(1 == ss.length);
                }
                {
                    let ss = graph.getSuccessor(6);
                    assert(0 == ss.length);
                }
            }
        );

        it("should return a correct predecessors",
            function () {
                {
                    let ss = graph.getPredecessor(2)
                    assert(arrays.contains(ss, 1));
                    assert(1 == ss.length);
                }
                {
                    let ss = graph.getPredecessor(3)
                    assert(arrays.contains(ss, 1));
                    assert(1 == ss.length);
                }
                {
                    let ss = graph.getPredecessor(4)
                    assert(arrays.contains(ss, 2));
                    assert(1 == ss.length);
                }
                {
                    let ss = graph.getPredecessor(5)
                    assert(arrays.contains(ss, 3));
                    assert(arrays.contains(ss, 5));
                    assert(2 == ss.length);
                }
                {
                    let ss = graph.getPredecessor(6)
                    assert(arrays.contains(ss, 3));
                    assert(1 == ss.length);
                }
                {
                    let ss = graph.getPredecessor(1)
                    assert(0 == ss.length);
                }
            }
        );
    }
);

describe("Directed Graph Class",
    function () {
        let graph = new DirectedGraph();
        graph.addEdge(1, 2);
        graph.addEdge(2, 3);
        graph.addEdge(2, 5);
        graph.addEdge(3, 4);
        graph.addEdge(4, 3);
        graph.addEdge(5, 3);
        graph.addEdge(5, 6);
        graph.addEdge(6, 7);
        graph.addEdge(7, 6);

        graph.addEdge(8, 9);

        it("should return correct reachable nodes from a given node.",
            function () {
                {
                    let nodes: number[] = graph.reachableFrom(1);
                    assert(7 == nodes.length);
                }
                {
                    let nodes: number[] = graph.reachableFrom(3);
                    assert(2 == nodes.length);
                }
                {
                    let nodes: number[] = graph.reachableFrom(5);
                    assert(5 == nodes.length);
                }
            }
        );

        it("should return correct reachable nodes to a given node.",
            function () {
                {
                    let nodes: number[] = graph.reachableTo(1);
                    assert(1 == nodes.length);
                }
                {
                    let nodes: number[] = graph.reachableTo(3);
                    assert(5 == nodes.length);
                }
                {
                    let nodes: number[] = graph.reachableTo(5);
                    assert(3 == nodes.length);
                }
            }
        );


    }



);
import { DirectedGraph } from "./directedGraph";


let graph = new DirectedGraph();

graph.addEdge(1, 2);
graph.addEdge(2, 3);
graph.addEdge(2, 5);
graph.addEdge(3, 4);
graph.addEdge(5, 4);
graph.addEdge(5, 4);

graph.addEdge(5, 6);
graph.addEdge(6, 7);
graph.addEdge(7, 6);
graph.addEdge(7, 8);

graph.depthFirstSearch(5,
    function on(nodeId) {
        console.log("ON : " + nodeId);
    },
    function off(nodeId) {
        console.log("OFF : " + nodeId);
    }
);

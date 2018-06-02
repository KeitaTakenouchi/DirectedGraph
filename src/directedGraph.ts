import { Set, MultiDictionary, Stack } from "typescript-collections";

export class DirectedGraph {
    private edges: MultiDictionary<number, number> = new MultiDictionary<number, number>();
    private nodes: Set<number> = new Set<number>();

    private reverseGraph: DirectedGraph;

    constructor(createReverse?: boolean) {
        if (createReverse != false) {
            this.reverseGraph = new DirectedGraph(false);
            this.reverseGraph.reverseGraph = this;
        }
    }

    public addEdge(from: number, to: number): void {
        this.nodes.add(from);
        this.reverseGraph.nodes.add(from);

        this.nodes.add(to);
        this.reverseGraph.nodes.add(to);

        this.edges.setValue(from, to);
        this.reverseGraph.edges.setValue(to, from);
    }

    public forEachEdge(callBack: (from: number, to: number) => void): void {
        for (let from of this.edges.keys()) {
            for (let to of this.edges.getValue(from)) {
                callBack(from, to);
            }
        }
    }

    public getSuccessor(nodeId: number): number[] {
        return this.edges.getValue(nodeId);
    }

    public getPredecessor(nodeId: number): number[] {
        return this.reverseGraph.getSuccessor(nodeId);
    }

    public reachableFrom(nodeId: number): number[] {
        let visited = [];
        this.depthFirstSearch(nodeId,
            function on(nodeId) {
                visited.push(nodeId);
            }
        )
        return visited;
    }

    public reachableTo(nodeId: number): number[] {
        return this.reverseGraph.reachableFrom(nodeId);
    }

    public getNodeCount(): number {
        return this.nodes.size();
    }

    public getEdgeCount(): number {
        let sum = 0;
        this.forEachEdge(() => { sum++; });
        return sum;
    }

    public depthFirstSearch(startId: number,
        on: (nodeId: number) => void,
        off?: (nodeId: number) => void
    ): void {
        let worklist = new Stack<{ id: number, index: number }>();
        let visited = new Set<number>();

        worklist.push({ id: startId, index: 0 });
        visited.add(startId);

        while (!worklist.isEmpty()) {
            let node = worklist.peek();

            // check a first visit or not
            if (node.index == 0) {
                on(node.id);
                visited.add(node.id);
            }

            // check all successors are done
            if (node.index == this.getSuccessor(node.id).length) {
                worklist.pop();
                off(node.id);
                continue;
            }

            let next = this.getSuccessor(node.id)[node.index];
            node.index++;

            if (!visited.contains(next)) {
                worklist.push({ id: next, index: 0 });
            }
        }


    }
}
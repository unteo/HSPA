import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import { Edge, Node, Layout, NgxGraphModule } from '@swimlane/ngx-graph';
//import graphData from 'src/assets/graphData.json';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],

})
export class GraphComponent implements OnInit {

  nodes: Node[] =[
    { id: '1', label: 'Start' },
    { id: '2', label: 'End' }
  ];
  links: Edge[] =  [
    { source: '1', target: '2'}
  ];

  view: [number, number] = [700, 400];
  curve: any;
  constructor() { }

  ngOnInit(): void {
  //  this.nodes = [
  //     { id: 'a', label: 'Node A' },
  //     { id: 'b', label: 'Node B' },
  //     { id: 'c', label: 'Node C' },
  //     { id: 'd', label: 'Node D' }
  //   ];

  //   this.links = [
  //     { source: 'a', target: 'b', label: 'connects to' },
  //     { source: 'b', target: 'c', label: 'connects to' },
  //     { source: 'c', target: 'd', label: 'connects to' },
  //     { source: 'd', target: 'a', label: 'connects to' }
  //   ];

       console.log('Nodes:', this.nodes);
    console.log('Links:', this.links);
  }

}

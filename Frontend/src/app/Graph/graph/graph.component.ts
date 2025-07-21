
import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { UserTreeService } from 'src/services/user-tree.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html'
})

export class GraphComponent implements OnInit {

  usersTree : TreeNode[] = [];
  selectedFile!: TreeNode;

  constructor(private userTreeService : UserTreeService) { }

  ngOnInit(): void {

    this.userTreeService.getUserTree().subscribe(data => {
      this.usersTree = data;
    });

  }

   nodeSelect(event: any)
    {
      console.log('Node selected', event.node);
    }
}



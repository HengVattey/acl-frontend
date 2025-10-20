import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';

@Component({
  selector: 'app-view-users',
  imports: [TreeTableModule],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent {

    // files!: TreeNode[];
    // constructor(private nodeService: NodeService) {}
    // ngOnInit() {
    //     this.nodeService.getFilesystem().then((files) => (this.files = files));
    // }


}

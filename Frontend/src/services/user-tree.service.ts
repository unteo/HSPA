import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TreeNode } from 'primeng/api';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserTreeService {
   baseUrl = environment.baseUrl;

constructor(private http: HttpClient) {}

getUserTree(): Observable<TreeNode[]> {
  return this.http.get<any>(this.baseUrl + '/User/hierarchy-tree').pipe(
      map(rootUser => [this.mapToTreeNode(rootUser)])
    );
}
 private mapToTreeNode(user: any): TreeNode {
    return {
      label: user.username,
      data: { id: user.id, fatherId: user.fatherId },
      expandedIcon: 'pi pi-user',
      collapsedIcon: 'pi pi-user',
      children: user.children ? user.children.map((child: any) => this.mapToTreeNode(child)) : []
    };
  }

}

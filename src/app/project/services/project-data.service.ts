import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Project } from '../models/project.model';

@Injectable({
    providedIn: 'root',
})
export class ProjectDataService {
    constructor(private http: HttpClient) {}

    public getProjects() : Observable<any> {
        return this.http.get(`/api/projects`)
    }

    public updateProjectName (projectId: number, projectName: string) : Observable<any> {
        return this.http.patch(`/api/project`,{
            projectId: projectId,
            projectName: projectName
        })
    }

    public addProject (project: Project)  : Observable<any>{
        return this.http.post(`/api/project`, project);
    }

    public deleteProject (projectId: number) : Observable<any>{
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            body: {
                projectId: projectId
            }
          }
        return this.http.delete(`/api/project`,options);
    }
}
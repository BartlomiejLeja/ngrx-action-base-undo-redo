import { ProjectState, initialState } from './state/project.model';
import { ProjectActions, ProjectActionTypes } from './project.action';

export function projectReducer(state: ProjectState = initialState, action: ProjectActions ): ProjectState{
    switch (action.type){
        case ProjectActionTypes.GetProjectsSuccess: 
            return {
                ...state,
                projectsColection : action.payload
            }
        case ProjectActionTypes.GetProjectsFail:
            return {
                ...state,
            }
        case ProjectActionTypes.UpdateProjectNameSuccess:
            let index = state.projectsColection.map(project => project.id).indexOf(action.payload.projectId);
            let newProject = state.projectsColection[index];
            newProject.projectName = action.payload.projectName;
            return {
                ...state,
                 projectsColection: state.projectsColection.map(project => project.id===action.payload.projectId ? project = newProject : project)
                    
                }
        case ProjectActionTypes.UpdateProjectNameFail:
            return {
                ...state,
            }

        case ProjectActionTypes.AddProjectSuccess:
            return {
                ...state,
                projectsColection: [...state.projectsColection, action.payload]
            }
        
        case ProjectActionTypes.AddProjectFail:
            return {
                ...state,
            }

        case ProjectActionTypes.RemoveProjectSuccess:
            return {
                ...state,
                projectsColection: [...state.projectsColection.filter(p=> p.id !=action.payload)]
            }
        case ProjectActionTypes.RemoveProjectFail:
            return {
                ...state,
            }
        default:
        return state;
    }
}

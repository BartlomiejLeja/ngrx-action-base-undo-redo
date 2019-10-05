export class Project {
    id: number;
    projectName: string;
    numberOfLands: number;
    profit: number;
}

export class ProjectState {
    public projectsColection: Project[]
}

export const initialState : ProjectState = {
    projectsColection: [
        { id: 1, projectName: 'Item 1', numberOfLands: 1, profit: 1000 },
        { id: 2, projectName: 'Item 2',  numberOfLands: 2, profit: 1500 },
        { id: 3, projectName: 'Item 3',  numberOfLands: 3 , profit: 2000 }
    ]
}
export class Land {
     public id: number;
     public landName: string;
     public adress: string;
     public areaInHektars: number;
 }

export class LandState {
    public landsColection: Land[]
}

export const initialState : LandState = {
    landsColection: [
        { id: 1, landName: 'Item 1', adress: 'test1', areaInHektars: 10 },
        { id: 2, landName: 'Item 2',  adress: 'test2', areaInHektars: 15 },
        { id: 3, landName: 'Item 3',  adress: 'test3', areaInHektars: 20 }
    ]
}
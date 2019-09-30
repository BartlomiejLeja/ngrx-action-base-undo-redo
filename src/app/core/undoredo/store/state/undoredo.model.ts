export class History {
    public past: any[];
    public future: any[];
  }
  
  export class StateHistory {
    public history: History;
    public isInProgress: boolean;
  }
  
  export const initialStateHistory: StateHistory = {
    history: {
      past: [],
      future: []
    },
    isInProgress: false
  };
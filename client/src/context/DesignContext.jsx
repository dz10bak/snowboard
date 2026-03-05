import { createContext, useContext, useReducer } from 'react';

const DesignContext = createContext();

const initialState = {
  step: 1,
  shape: null,
  ridingStyle: null,
  graphicStyle: null,
  customText: '',
  isGenerating: false,
  generatedDesign: null,
  error: null,
};

function designReducer(state, action) {
  switch (action.type) {
    case 'SET_SHAPE':
      return { ...state, shape: action.payload, step: 2 };
    case 'SET_RIDING_STYLE':
      return { ...state, ridingStyle: action.payload, step: 3 };
    case 'SET_GRAPHIC_STYLE':
      return { ...state, graphicStyle: action.payload, step: 4 };
    case 'SET_CUSTOM_TEXT':
      return { ...state, customText: action.payload };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'START_GENERATING':
      return { ...state, isGenerating: true, error: null };
    case 'GENERATION_SUCCESS':
      return { ...state, isGenerating: false, generatedDesign: action.payload };
    case 'GENERATION_ERROR':
      return { ...state, isGenerating: false, error: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function DesignProvider({ children }) {
  const [state, dispatch] = useReducer(designReducer, initialState);

  return (
    <DesignContext.Provider value={{ state, dispatch }}>
      {children}
    </DesignContext.Provider>
  );
}

export function useDesign() {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error('useDesign must be used within a DesignProvider');
  }
  return context;
}

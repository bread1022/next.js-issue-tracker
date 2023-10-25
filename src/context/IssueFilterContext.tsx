'use client';

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

interface IssueFilterContextProps {
  children: ReactNode;
}

enum FilterActionType {
  RESET_FILTER = 'RESET_FILTER',
  FILTER_OPEN = 'FILTER_OPEN',
  FILTER_CLOSE = 'FILTER_CLOSE',
  FILTER_AUTHOR = 'FILTER_AUTHOR', //usename
  FILTER_LABEL = 'FILTER_LABEL', // ['labelName', 'labelName']
  FILTER_ASSIGNEE = 'FILTER_ASSIGNEE', // ['assigneeName', 'assigneeName']
  FILTER_COMMENT_BY_ME = 'FILTER_COMMENT_BY_ME', // 무조건 me (username)
}

export interface FilterState {
  isOpen: boolean | null;
  author: string | null;
  labels: string[];
  assignee: string | null;
  comment: string | null;
}

interface Action {
  type: FilterActionType;
  payload:
    | {
        username: string;
      }
    | {
        label: string;
      }
    | {};
}

const reducer = (state: FilterState, action: Action): FilterState => {
  const { isOpen, author, labels, assignee, comment } = state;
  const { type, payload } = action;

  switch (type) {
    case FilterActionType.RESET_FILTER: {
      return initialState;
    }
    case FilterActionType.FILTER_OPEN: {
      return {
        ...state,
        isOpen: isOpen === true ? null : true,
      };
    }
    case FilterActionType.FILTER_CLOSE: {
      return {
        ...state,
        isOpen: isOpen === false ? null : false,
      };
    }
    case FilterActionType.FILTER_AUTHOR: {
      if (!('username' in payload)) return state;
      const updateState = {
        ...state,
        author: author === payload.username ? null : payload.username,
      };
      return updateState;
    }
    case FilterActionType.FILTER_LABEL: {
      if (!('label' in payload)) return state;
      const updateState = {
        ...state,
        labels: labels.includes(payload.label)
          ? labels.filter((label) => label !== payload.label)
          : [...labels, payload.label],
      };
      return updateState;
    }
    case FilterActionType.FILTER_ASSIGNEE: {
      if (!('username' in payload)) return state;
      const updateState = {
        ...state,
        assignee: assignee === payload.username ? null : payload.username,
      };
      return updateState;
    }
    case FilterActionType.FILTER_COMMENT_BY_ME: {
      if (!('username' in payload)) return state;
      const updateState = {
        ...state,
        comment: comment === payload.username ? null : payload.username,
      };
      return updateState;
    }
    default:
      return state;
  }
};

export const initialState: FilterState = {
  isOpen: true,
  author: null,
  labels: [],
  assignee: null,
  comment: null,
};

const IssueFilterContext = createContext({
  filterState: initialState,
});

const IssueFilterDispatchContext = createContext({
  onResetFilter: () => {},
  onFilterOpen: () => {},
  onFilterClose: () => {},
  onFilterByAuthor: (author: string) => {},
  onFilterByLabels: (label: string) => {},
  onFilterByAssignee: (assignee: string) => {},
  onFilterByComment: (comment: string) => {},
});

const IssueFilterProvider = ({ children }: IssueFilterContextProps) => {
  const [filterState, dispatch] = useReducer(reducer, initialState);

  const onResetFilter = useCallback(
    () => dispatch({ type: FilterActionType.RESET_FILTER, payload: {} }),
    [],
  );

  const onFilterOpen = useCallback(
    () => dispatch({ type: FilterActionType.FILTER_OPEN, payload: {} }),
    [],
  );

  const onFilterClose = useCallback(
    () => dispatch({ type: FilterActionType.FILTER_CLOSE, payload: {} }),
    [],
  );

  const onFilterByAuthor = useCallback(
    (author: string) =>
      dispatch({
        type: FilterActionType.FILTER_AUTHOR,
        payload: { username: author },
      }),
    [],
  );

  const onFilterByLabels = useCallback(
    (label: string) =>
      dispatch({
        type: FilterActionType.FILTER_LABEL,
        payload: { label: label },
      }),
    [],
  );

  const onFilterByAssignee = useCallback(
    (assignee: string) =>
      dispatch({
        type: FilterActionType.FILTER_ASSIGNEE,
        payload: { username: assignee },
      }),
    [],
  );

  const onFilterByComment = useCallback(
    (comment: string) =>
      dispatch({
        type: FilterActionType.FILTER_COMMENT_BY_ME,
        payload: { username: comment },
      }),
    [],
  );

  const filterDispatch = useMemo(() => {
    return {
      onResetFilter,
      onFilterOpen,
      onFilterClose,
      onFilterByAuthor,
      onFilterByLabels,
      onFilterByAssignee,
      onFilterByComment,
    };
  }, [
    onResetFilter,
    onFilterOpen,
    onFilterClose,
    onFilterByAuthor,
    onFilterByLabels,
    onFilterByAssignee,
    onFilterByComment,
  ]);

  return (
    <IssueFilterContext.Provider value={{ filterState }}>
      <IssueFilterDispatchContext.Provider value={filterDispatch}>
        {children}
      </IssueFilterDispatchContext.Provider>
    </IssueFilterContext.Provider>
  );
};

export const useIssueFilterState = () => {
  const { filterState } = useContext(IssueFilterContext);
  return filterState;
};

export const useIssueFilterDispatch = () => {
  const {
    onResetFilter,
    onFilterOpen,
    onFilterClose,
    onFilterByAuthor,
    onFilterByLabels,
    onFilterByAssignee,
    onFilterByComment,
  } = useContext(IssueFilterDispatchContext);
  return {
    onResetFilter,
    onFilterOpen,
    onFilterClose,
    onFilterByAuthor,
    onFilterByLabels,
    onFilterByAssignee,
    onFilterByComment,
  };
};

export default IssueFilterProvider;

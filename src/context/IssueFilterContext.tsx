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

interface FilterState {
  isOpen: boolean;
  author: string | null;
  labels: string[];
  assignee: string | null;
  comment: string | null;
}

const reducer = (state: FilterState, action: Action): FilterState => {
  const { author, labels, assignee, comment } = state;
  const { type, payload } = action;

  switch (type) {
    case FilterActionType.RESET_FILTER:
      return initialState;
    case FilterActionType.FILTER_OPEN:
      return {
        ...state,
        isOpen: true,
      };
    case FilterActionType.FILTER_CLOSE:
      return {
        ...state,
        isOpen: false,
      };
    case FilterActionType.FILTER_AUTHOR:
      if ('username' in payload) {
        const updateState = {
          ...state,
          author: author === payload.username ? null : payload.username,
        };
        return updateState;
      }
      return state;
    case FilterActionType.FILTER_LABEL:
      if ('label' in payload) {
        const updateState = {
          ...state,
          labels: labels.includes(payload.label)
            ? labels.filter((label) => label !== payload.label)
            : [...labels, payload.label],
        };
        return updateState;
      }
      return state;
    case FilterActionType.FILTER_ASSIGNEE:
      if ('username' in payload) {
        const updateState = {
          ...state,
          assignee: assignee === payload.username ? null : payload.username,
        };
        return updateState;
      }
      return state;
    case FilterActionType.FILTER_COMMENT_BY_ME:
      if ('username' in payload) {
        const updateState = {
          ...state,
          comment: comment === payload.username ? null : payload.username,
        };
        return updateState;
      }
      return state;
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
  isInitial: true,
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

  const isInitial = useMemo(() => {
    return (
      filterState.isOpen === true &&
      filterState.author === null &&
      filterState.labels.length === 0 &&
      filterState.assignee === null &&
      filterState.comment === null
    );
  }, []);

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
      dispatch({ type: FilterActionType.FILTER_AUTHOR, payload: { author } }),
    [],
  );

  const onFilterByLabels = useCallback(
    (label: string) =>
      dispatch({ type: FilterActionType.FILTER_LABEL, payload: { label } }),
    [],
  );

  const onFilterByAssignee = useCallback(
    (assignee: string) =>
      dispatch({
        type: FilterActionType.FILTER_ASSIGNEE,
        payload: { assignee },
      }),
    [],
  );

  const onFilterByComment = useCallback(
    (comment: string) =>
      dispatch({
        type: FilterActionType.FILTER_COMMENT_BY_ME,
        payload: { comment },
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
  }, []);

  return (
    <IssueFilterContext.Provider value={{ filterState, isInitial }}>
      <IssueFilterDispatchContext.Provider value={filterDispatch}>
        {children}
      </IssueFilterDispatchContext.Provider>
    </IssueFilterContext.Provider>
  );
};

export const useIssueFilterState = () => {
  const { filterState, isInitial } = useContext(IssueFilterContext);
  return { filterState, isInitial };
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

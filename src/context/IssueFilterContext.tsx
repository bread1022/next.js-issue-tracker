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
  FILTER_AUTHOR = 'FILTER_AUTHOR',
  FILTER_LABEL = 'FILTER_LABEL',
  FILTER_ASSIGNEE = 'FILTER_ASSIGNEE',
  FILTER_COMMENT_BY_ME = 'FILTER_COMMENT_BY_ME',
}

export interface FilterState {
  isOpen: boolean | null;
  author: string | null;
  labels: string[];
  assignee: string | null;
  comment: string | null;
}

type PayloadType =
  | {
      username: string;
    }
  | {
      label: string;
    }
  | {};

interface Action {
  type: FilterActionType;
  payload: PayloadType;
}

const reducer = (state: FilterState, action: Action): FilterState => {
  const { isOpen, labels } = state;
  const { type, payload } = action;

  const updateState = (
    key: keyof FilterState,
    value: PayloadType | null,
  ): FilterState => ({
    ...state,
    [key]: state[key] === value ? null : value,
  });

  switch (type) {
    case FilterActionType.RESET_FILTER:
      return initialState;

    case FilterActionType.FILTER_OPEN:
      return updateState('isOpen', isOpen === true ? null : true);

    case FilterActionType.FILTER_CLOSE:
      return updateState('isOpen', isOpen === false ? null : false);

    case FilterActionType.FILTER_AUTHOR:
      return 'username' in payload
        ? updateState('author', payload.username)
        : state;

    case FilterActionType.FILTER_LABEL:
      return 'label' in payload
        ? updateState(
            'labels',
            labels.includes(payload.label)
              ? labels.filter((label) => label !== payload.label)
              : [...labels, payload.label],
          )
        : state;

    case FilterActionType.FILTER_ASSIGNEE:
      return 'username' in payload
        ? updateState('assignee', payload.username)
        : state;

    case FilterActionType.FILTER_COMMENT_BY_ME:
      return 'username' in payload
        ? updateState('comment', payload.username)
        : state;

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

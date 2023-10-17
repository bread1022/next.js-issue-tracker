'use client';

import {
  ReactNode,
  createContext,
  useReducer,
  useCallback,
  useMemo,
  useContext,
} from 'react';

interface IssueCheckContextProps {
  children: ReactNode;
}

enum CheckActionType {
  ALL_CHECK = 'ALL_CHECK',
  CHECK = 'CHECK',
  ALL_UNCHECK = 'ALL_UNCHECK',
  SWITCH_CHECK = 'SWITCH_CHECK',
}

interface Action {
  type: CheckActionType;
  payload:
    | {
        id: string;
      }
    | {
        checkeditems: string[];
      }
    | {};
}

interface CheckState {
  isAllChecked: boolean;
  checkeditems: string[]; // Issue Id 저장
}

const reducer = (state: CheckState, action: Action): CheckState => {
  const { checkeditems } = state;
  const { type, payload } = action;

  switch (type) {
    case CheckActionType.ALL_CHECK: {
      if ('checkeditems' in payload)
        return {
          ...state,
          isAllChecked: true,
          checkeditems: payload.checkeditems,
        };
      return state;
    }
    case CheckActionType.CHECK: {
      if ('id' in payload) {
        const updateState = {
          ...state,
          checkeditems: checkeditems.includes(payload.id)
            ? checkeditems.filter((id) => id !== payload.id)
            : [...checkeditems, payload.id],
        };
        return {
          ...state,
          isAllChecked: updateState.checkeditems.length > 0,
          checkeditems: updateState.checkeditems,
        };
      }
      return state;
    }
    case CheckActionType.ALL_UNCHECK:
      return {
        ...state,
        isAllChecked: false,
        checkeditems: [],
      };
    case CheckActionType.SWITCH_CHECK: {
      return {
        ...state,
        isAllChecked: !state.isAllChecked,
        checkeditems: [],
      };
    }
    default:
      return state;
  }
};

const initialState: CheckState = {
  isAllChecked: false,
  checkeditems: [],
};

const IssueCheckContext = createContext({
  checkedIssuesState: initialState,
});

const IssueCheckDispatchContext = createContext({
  onCheckAll: (checkeditems: string[]) => {},
  onCheck: (id: string) => {},
  onUncheckAll: () => {},
  onSwitchCheck: () => {},
});

const IssueCheckProvider = ({ children }: IssueCheckContextProps) => {
  const [checkedIssuesState, dispatch] = useReducer(reducer, initialState);

  const onCheckAll = useCallback((checkeditems: string[]) => {
    dispatch({
      type: CheckActionType.ALL_CHECK,
      payload: { checkeditems },
    });
  }, []);

  const onCheck = useCallback((id: string) => {
    dispatch({
      type: CheckActionType.CHECK,
      payload: { id },
    });
  }, []);

  const onUncheckAll = useCallback(() => {
    dispatch({
      type: CheckActionType.ALL_UNCHECK,
      payload: {},
    });
  }, []);

  const onSwitchCheck = useCallback(() => {
    dispatch({
      type: CheckActionType.SWITCH_CHECK,
      payload: {},
    });
  }, []);

  const checkIssuesDispatch = useMemo(() => {
    return {
      onCheckAll,
      onCheck,
      onUncheckAll,
      onSwitchCheck,
    };
  }, []);

  return (
    <IssueCheckContext.Provider value={{ checkedIssuesState }}>
      <IssueCheckDispatchContext.Provider value={checkIssuesDispatch}>
        {children}
      </IssueCheckDispatchContext.Provider>
    </IssueCheckContext.Provider>
  );
};

export const useIssueCheckState = () => {
  const { checkedIssuesState } = useContext(IssueCheckContext);
  return checkedIssuesState;
};

export const useIssueCheckDispatch = () => {
  const { onCheckAll, onCheck, onUncheckAll, onSwitchCheck } = useContext(
    IssueCheckDispatchContext,
  );
  return { onCheckAll, onCheck, onUncheckAll, onSwitchCheck };
};

export default IssueCheckProvider;

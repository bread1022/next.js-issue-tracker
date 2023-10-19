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
  ALL_CHECK_IN = 'ALL_CHECK_IN',
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
  checkedAll: boolean;
  checkeditems: string[]; // Issue Id 저장
}

const reducer = (state: CheckState, action: Action): CheckState => {
  const { checkeditems } = state;
  const { type, payload } = action;

  switch (type) {
    case CheckActionType.ALL_CHECK: {
      return {
        ...state,
        checkedAll: true,
      };
    }
    case CheckActionType.ALL_CHECK_IN: {
      if (!('checkeditems' in payload)) return state;
      return {
        ...state,
        checkeditems: payload.checkeditems,
      };
    }
    case CheckActionType.CHECK: {
      if (!('id' in payload)) return state;
      const updateState = {
        ...state,
        checkeditems: checkeditems.includes(payload.id)
          ? checkeditems.filter((id) => id !== payload.id)
          : [...checkeditems, payload.id],
      };
      return {
        ...state,
        checkeditems: updateState.checkeditems,
      };
    }
    case CheckActionType.ALL_UNCHECK:
      return {
        ...state,
        checkedAll: false,
        checkeditems: [],
      };
    case CheckActionType.SWITCH_CHECK: {
      return {
        ...state,
        checkedAll: !state.checkedAll,
        checkeditems: [],
      };
    }
    default:
      return state;
  }
};

const initialState: CheckState = {
  checkedAll: false,
  checkeditems: [],
};

const IssueCheckContext = createContext({
  checkedIssuesState: initialState,
});

const IssueCheckDispatchContext = createContext({
  onCheckAll: () => {},
  onCheckAllIn: (checkeditems: string[]) => {},
  onCheck: (id: string) => {},
  onUncheckAll: () => {},
  onSwitchCheck: () => {},
});

const IssueCheckProvider = ({ children }: IssueCheckContextProps) => {
  const [checkedIssuesState, dispatch] = useReducer(reducer, initialState);

  const onCheckAll = useCallback(() => {
    dispatch({
      type: CheckActionType.ALL_CHECK,
      payload: {},
    });
  }, []);

  const onCheckAllIn = useCallback((checkeditems: string[]) => {
    dispatch({
      type: CheckActionType.ALL_CHECK_IN,
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
      onCheckAllIn,
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
  const { onCheckAll, onCheckAllIn, onCheck, onUncheckAll, onSwitchCheck } =
    useContext(IssueCheckDispatchContext);
  return { onCheckAll, onCheckAllIn, onCheck, onUncheckAll, onSwitchCheck };
};

export default IssueCheckProvider;

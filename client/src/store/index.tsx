import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { boolean } from "yargs";
import { string } from "yup";

// 로그인, 로그아웃 관련 state입니다.
export interface IsLogin {
  login: boolean;
}

const initialIsLoginState: IsLogin = {
  login: false,
};

const isLogInSlice = createSlice({
  name: "isLogin",
  initialState: initialIsLoginState,
  reducers: {
    setIsLogin(state, action: PayloadAction<boolean>) {
      state.login = action.payload;
    },
  },
});

//  회원가입 관련 state 입니다
export interface IsSignUp {
  signUp: boolean;
}

const initialSignUpState: IsSignUp = {
  signUp: false,
};

const isSignUpSlice = createSlice({
  name: "signUp",
  initialState: initialSignUpState,
  reducers: {
    setIsSignUp(state, action: PayloadAction<boolean>) {
      state.signUp = action.payload;
    },
  },
});

// 생성할 vote format 관련 state입니다.
export interface VoteItems {
  idx: number;
  content: string;
  count?: number;
}

export interface NewVote {
  format: string;
  title: string;
  type?: string;
  items: VoteItems[];
  multiple?: boolean;
  manytines?: boolean;
}

const initialVoteItemState = {
  idx: 1,
  content: "",
};

const initialVoteState: NewVote = {
  format: "",
  title: "",
  type: "",
  items: [],
  multiple: false,
  manytines: false,
};

const newVoteItemSlice = createSlice({
  name: "newVoteItem",
  initialState: initialVoteItemState,
  reducers: {
    setItem(state, action: PayloadAction<string>) {
      state.content = action.payload;
    },
    setIndex(state, action: PayloadAction<number>) {
      state.idx = action.payload;
    },
  },
});

const newVoteSlice = createSlice({
  name: "newVote",
  initialState: initialVoteState,
  reducers: {
    setFormat(state, action: PayloadAction<string>) {
      state.format = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setType(state, action: PayloadAction<string>) {
      state.type = action.payload;
    },
    setItems(state, action: PayloadAction<VoteItems>) {
      state.items = [...state.items, action.payload];
    },
    setMultiple(state, action: PayloadAction<boolean>) {
      state.multiple = action.payload;
    },
    setManyTimes(state, action: PayloadAction<boolean>) {
      state.manytines = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    isSignUp: isSignUpSlice.reducer,
    isLogin: isLogInSlice.reducer,
    makeNewVote: newVoteSlice.reducer,
    makeNewVoteItem: newVoteItemSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const { setIsLogin } = isLogInSlice.actions;

export const { setIsSignUp } = isSignUpSlice.actions;

export const {
  setFormat,
  setTitle,
  setType,
  setItems,
  setMultiple,
  setManyTimes,
} = newVoteSlice.actions;

export const { setItem, setIndex } = newVoteItemSlice.actions;

export default store;

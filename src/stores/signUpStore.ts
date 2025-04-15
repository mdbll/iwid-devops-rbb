import { defineStore } from "pinia";

type SignUpStep = {
  nextStep: string;
  isSignUpComplete: boolean;
  userId: string | undefined;
  username: string | null;
};

export const useSignUpStore = defineStore("user", {
  state: () => ({
    data: {
      nextStep: "",
      isSignUpComplete: false,
      userId: undefined as string | undefined,
      username: null as string | null,
    },
  }),
  actions: {
    setUser(data: SignUpStep) {
      this.data = data;
    },
    clearUser() {
      this.data = {
        nextStep: "",
        isSignUpComplete: false,
        userId: "",
        username: null,
      };
    },
  },
});

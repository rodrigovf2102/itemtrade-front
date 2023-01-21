import useAsync from "../useAsync";

import * as authApi from "../../services/userApi";

export default function useSignIn() {
  const {
    loading: signInLoading,
    error: signInError,
    act: signIn
  } = useAsync(authApi.signIn);

  return {
    signInLoading,
    signInError,
    signIn
  };
}

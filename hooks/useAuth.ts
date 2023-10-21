import {useAppDispatch, useAppSelector} from "../redux/store";
import {AuthState, signIn, signOut} from "../redux/slices/authSlice";


export const useAuth = () => {
    const dispatch = useAppDispatch();
    const authData = useAppSelector(state => state.auth);
    return {
        signIn: (authData: AuthState) => {
            dispatch(signIn(authData));
        },
        signOut: () => {
            dispatch(signOut());
        },
        authData,
    };
}

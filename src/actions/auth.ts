export const login = (user_id: number) => ({
    type: 'LOGIN',
    user_id
});

export const logout = () => ({
    type: 'LOGOUT'
});

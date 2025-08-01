type User = {
    user_id: number;
    username: string;
    firstname: string;
    lastname: string;
    user_email: string;
    user_location_id: number;
    user_default_location: number;
    is_active: boolean;
};

type Auth = {
    user_id: number;
    username: string;
    password: string;
};

type AuthToken = {
    token_id: number;
    user_id: number;
    token: string;
    refreshToken: string;
};

type Params = {
    [key: string]:
        | string
        | number
        | string[]
        | number[]
        | undefined
        | Function
        | null
        | Params;
};

export {
    User,
    Auth,
    AuthToken,
    Params
};

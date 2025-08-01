const EAdmin = Object.freeze({
    VIEW_USERS: "view_users",
    ADD_USERS: "add_users",
    EDIT_USERS: "edit_users",
    DELETE_USERS: "delete_users",

});

// check permission for the role eg (Users, View)
var can_access = async (_role: number, _permission: string): Promise<boolean> => {

    return true
};

export { can_access, EAdmin };

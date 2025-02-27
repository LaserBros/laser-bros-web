// utils/permissions.js
export const hasPermission = (permissions, permissionKey) => {
    return permissions[permissionKey] === 1;
  };
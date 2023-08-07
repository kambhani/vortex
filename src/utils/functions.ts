import { UserRole } from "./constants";

// Whether the user role has at least mod permissions
export const hasModPermissions = (role: UserRole | string | undefined) => {
  return role === UserRole.MOD || role === UserRole.ADMIN || role === UserRole.OWNER;
}

// Whether the user role has at least admin permissions
export const hasAdminPermissions = (role: UserRole | string | undefined) => {
  return role === UserRole.ADMIN || role === UserRole.OWNER;
}

// Whether the user role has at least owner permissions
export const hasOwnerPermissions = (role: UserRole | string | undefined) => {
  return role === UserRole.ADMIN || role === UserRole.OWNER;
}
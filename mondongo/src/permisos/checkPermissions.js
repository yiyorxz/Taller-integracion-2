// src/permisos/checkPermissions.js
// EDITAR, PARA determinar correctamnete
import roles from './roles';

export function userHasAccess(role, route) {
  const userRole = roles[role];
  if (!userRole) return false;
  return userRole.allowedRoutes.includes(route);
}

export function userHasPermission(role, permission) {
  const userRole = roles[role];
  if (!userRole) return false;
  return userRole.permissions.includes(permission);
}

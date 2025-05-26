import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  const router = inject(Router);

  const userType = localStorage.getItem('userType');
  const expectedRoles = route.data['expectedRoles'] as Array<string>;

  if (!userType || !expectedRoles || expectedRoles.length === 0) {
    console.warn('RoleGuard: No userType o expectedRoles definidos para la ruta.');
    router.navigate(['/login']); // O a una página de acceso denegado/error
    return false;
  }

  const hasRequiredRole = expectedRoles.includes(userType);

  if (hasRequiredRole) {
    return true; 
  } else {
    console.warn(`RoleGuard: Acceso denegado. Usuario tipo '${userType}' no tiene rol esperado para ${state.url}. Roles esperados: ${expectedRoles.join(', ')}`);
    if (userType === 'dr') {
      router.navigate(['/layout-dr/appointments-dr']); 
    } else if (userType === 'pa') {
      router.navigate(['/layout/appointments']); 
    } else {
      router.navigate(['/login']); 
    }
    return false; 
  }
};

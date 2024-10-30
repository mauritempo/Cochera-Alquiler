import { CanActivateFn, RedirectCommand, Router, RouterOutlet } from '@angular/router';
import { DataAuthService, } from '../services/data-auth.service';
import { inject } from '@angular/core';

export const soloAdminGuard: CanActivateFn = (route, state) => {
  const dataAuthService = inject(DataAuthService);
  const router = inject(Router);

  if (dataAuthService.usuario?.esAdmin) return true;
  const url = router.parseUrl('/cocheras');
  return new RedirectCommand(url);
};

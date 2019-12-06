import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { NotificationService } from './shared/messages/notification.service';
import { AuthService } from './security/auth.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

    constructor(private ns: NotificationService,
                private injector: Injector,
                private zone: NgZone) {
        super();
    }

    handleError(errorResponse: HttpErrorResponse | any) {
        if (errorResponse instanceof HttpErrorResponse) {
            const message = errorResponse.error.message;

            // executar dentro de uma zona
            this.zone.run(() => {
                switch (errorResponse.status) {
                    case 401:
                        this.injector.get(AuthService).handleLogin();
                        break;
                    case 403:
                        this.ns.notify(message || 'Não autorizado');
                        break;
                    case 404:
                        this.ns.notify(message || 'Recurso não encontrado. Verifique o console para mais detalhes');
                        break;
                }
            });
        }

        super.handleError(errorResponse);

    }
}

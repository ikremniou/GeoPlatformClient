const rolesSchema = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

export class PasswordTokenModel {
    aud: string;
    exp: number;
    iss: string;
    [rolesSchema]: string | string[]
}
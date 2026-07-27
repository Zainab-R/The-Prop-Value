export class AuthService {
  static async register() {
    return { success: true, message: "Auth service ready" };
  }

  static async login() {
    return { success: true, message: "Login service ready" };
  }
}

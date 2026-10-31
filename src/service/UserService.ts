import User from "@/domain/User";
import type UserData from "@/helper/DTOs/UserData";
import type { AxiosInstance } from "axios";
import { useAuthStore } from "@/stores/auth";

export default class UserService {

    constructor (readonly http: AxiosInstance) {
    }

    private storeToken(accessToken: string): void {
        useAuthStore().setToken(accessToken);
    }

    async login(userData: UserData): Promise<void> {
        const response = await this.http.post('/auth/login', {
            nick: userData.nick,
            password: userData.password
        });
        this.storeToken(response.data.accessToken);
    }

    async register(userData: UserData): Promise<void> {
        if (userData.password !== userData.coPassword)
            throw new Error("As senhas não conferem");
        const response = await this.http.post('/auth/register', {
            nick: userData.nick,
            password: userData.password
        });
        this.storeToken(response.data.accessToken);
    }

    async me(): Promise<User> {
        const response = await this.http.post('/auth/me');
        return new User(response.data.id, response.data.nick);
    }

    async search(nick: string): Promise<User[]> {
        const response = await this.http.post('/user/search', { nick });
        return response.data.map((user: { id: string, nick: string }) => new User(user.id, user.nick));
    }

}

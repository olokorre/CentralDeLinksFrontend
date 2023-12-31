import User from "@/domain/User";
import type UserData from "@/helper/DTOs/UserData";
import type { AxiosInstance } from "axios";

export default class UserService {

    constructor (readonly http: AxiosInstance) {
    }

    async login(userData: UserData): Promise<User> {
        const response = await this.http.post('/auth/login', userData);
        localStorage.setItem('accessToken', response.data.accessToken);
        return new User(response.data.id, response.data.nick, response.data.accessToken);
    }

    async register(userData: UserData): Promise<User> {
        if (userData.password !== userData.coPassword)
            throw new Error("As senhas não conferem");
        const response = await this.http.post('/auth/register', userData);
        localStorage.setItem('accessToken', response.data.accessToken);
        return new User(response.data.id, response.data.nick, response.data.accessToken);
    }

    async me(): Promise<User> {
        const response = await this.http.post('/auth/me');
        return new User(response.data.id, response.data.nick, response.data.accessToken);
    }

    async search(nick: string): Promise<User[]> {
        const response = await this.http.post('/user/search', { nick });
        return response.data.map((user: any) => new User(user.id, user.nick));
    }

}

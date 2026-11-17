import Link from "@/domain/Link";
import User from "@/domain/User";
import type PublicProfileData from "@/helper/DTOs/PublicProfileData";
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

    async getPublicProfile(nick: string): Promise<PublicProfileData> {
        const response = await this.http.get(`/profile/${nick}`);
        const links = response.data.links.map((link: { id: string, description: string, url: string }) =>
            new Link(link.description, link.url, link.id));
        return {
            nick: response.data.nick,
            bio: response.data.bio,
            links,
            followers: response.data.followers,
            following: response.data.following,
            isFollowing: response.data.isFollowing
        };
    }

    async follow(nick: string): Promise<void> {
        await this.http.post(`/profile/${nick}/follow`);
    }

    async unfollow(nick: string): Promise<void> {
        await this.http.delete(`/profile/${nick}/follow`);
    }

    async editBio(bio: string): Promise<string> {
        const response = await this.http.patch('/profile', { bio });
        return response.data.bio;
    }

}

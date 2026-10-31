import Link from "@/domain/Link";
import type User from "@/domain/User";
import type { AxiosInstance } from "axios";

export default class LinkService {

    constructor(readonly http: AxiosInstance) {
    }

    async create(link: Link): Promise<Link> {
        const response = await this.http.post('/links/add', {
            description: link.description,
            url: link.url
        });
        return new Link(response.data.description, response.data.url, response.data.id);
    }

    async getAll(page?: number, limit?: number): Promise<Link[]> {
        const params: { page?: number, limit?: number } = {};
        if (page !== undefined) params.page = page;
        if (limit !== undefined) params.limit = limit;
        const response = await this.http.get('/links/get', { params });
        const links = [];
        for (const link of response.data.links)
            links.push(new Link(link.description, link.url, link.id));
        return links;
    }

    async remove(link: Link): Promise<void> {
        await this.http.delete('/links/delete', { data: {
            linkId: link.id
        }});
    }

    async find(linkId: string): Promise<Link> {
        const response = await this.http.get(`/links/get/${linkId}`);
        return new Link(response.data.description, response.data.url, response.data.id);
    }

    async changeDescription(linkId: string, description: string): Promise<void> {
        await this.http.put('/links/change-description', {
            linkId,
            description
        });
    }

    async share(user: User, link: Link): Promise<void> {
        await this.http.post('/links/share', {
            linkId: link.id,
            userIdToShareLink: user.id
        });
    }

}

import Link from "@/domain/Link";
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

    async getAll(): Promise<Link[]> {
        const response = await this.http.get('/links/get');
        const links = [];
        for (const link of response.data.links)
            links.push(new Link(link.description, link.url, link.id));
        return links;
    }

}

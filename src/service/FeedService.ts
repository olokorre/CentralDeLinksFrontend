import Link from "@/domain/Link";
import type { AxiosInstance } from "axios";

export default class FeedService {

    constructor(readonly http: AxiosInstance) {
    }

    async getFeed(page?: number, limit?: number): Promise<Link[]> {
        const params: { page?: number, limit?: number } = {};
        if (page !== undefined) params.page = page;
        if (limit !== undefined) params.limit = limit;
        const response = await this.http.get('/feed', { params });
        const links: Link[] = [];
        for (const link of response.data.links)
            links.push(new Link(link.description, link.url, link.id));
        return links;
    }

}

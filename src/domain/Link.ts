export default class Link {

    constructor(readonly description: string, readonly url: string, readonly id?: string) {
    }

    format(): string {
        if (this.description.length < 30) return this.description;
        return this.description.slice(0, 30) + '...';
    }

}

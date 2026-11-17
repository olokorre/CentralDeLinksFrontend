import Link from "@/domain/Link";

export default interface PublicProfileData {

    nick: string;
    bio: string;
    links: Link[];
    followers: number;
    following: number;
    isFollowing?: boolean;

}

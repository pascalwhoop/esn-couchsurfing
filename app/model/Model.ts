export module Model{

    export interface Comment {
        text: string;
        timestamp: any;
        userid: string;
    }

    export interface PostDetails {
        city_name: string;
        people: number;
        stay_end: number;
        stay_start: number;
    }

    export interface Post {
        creator_name: string;
        comments: Comment[];
        details: PostDetails;
        text: string;
        timestamp: number;
        uid: string;
    }

}


export module Model {

    export interface Comment {
        text:string;
        timestamp:any;
        user_uid:string;
    }

    export interface PostDetails {
        city_name:string;
        people:number;
        stay_end:number;
        stay_start:number;
    }

    export interface Post {
        creator_name:string;
        comments:Comment[];
        details:PostDetails;
        text:string;
        timestamp:number;
        user_uid:string;
    }


    /**
     * A User profile that is stored in the Database and can be fetched by any other user.
     */
    export interface PublicUserProfile {
        displayName:string;
        email:string;
        emailVerified:boolean;
        isAnonymous:boolean;
        photoURL:string;
        providerData:ProviderData[];
        uid:string;
    }
    
    export interface ProviderData {
        displayName:string;
        email:string;
        photoURL:string;
        providerId:string;
        uid:string;
    }


}


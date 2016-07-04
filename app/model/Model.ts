export module Model {
    
    //Angular FIre List Entries include the $key variable
    export interface IAFListEntry {
        $key? : string;
    }

    export interface IUid{
        uid: string;
    }

    export interface Comment extends IAFListEntry{
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

    export interface Post extends IAFListEntry{
        creator_name:string;
        comments:any; //todo fix
        details:PostDetails;
        text:string;
        timestamp:number;
        user_uid:string;
    }


    /**
     * A User profile that is stored in the Database and can be fetched by any other user.
     */
    export interface PublicUserProfile extends IAFListEntry{
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

    /* Sections */
    export interface EsnSection extends IAFListEntry, IUid{
        name: string,
        city: string,
        university: string
        tags?: string
        url ?: string
        fbUrl ?: string
    }


}


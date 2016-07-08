//Angular FIre List Entries include the $key variable
export interface IAFListEntry {
    $key?:string;
}

export interface IUid {
    uid:string;
}

export interface PostComment extends IAFListEntry {
    text:string;
    timestamp:any;
    user_uid:string;
}

export interface PostDetails {
    location:string;
    section_id:string;
    people:number;
    stay_end:string;
    stay_start:string;
}

export interface Post extends IAFListEntry {
    creator_name:string;
    comments ?:any; //todo fix
    details:PostDetails;
    text:string;
    timestamp:number;
    user_uid:string;
}

export interface Section extends IAFListEntry {
    c:string;
    facebook:string;
    l:string;
    latitude:string;
    longitude:string;
    postaladdress:string;
    sc:string;
    sectionname:string;
    street:string;
    subject:string;
    subject_id:string;
    website:string;
}


/**
 * A User profile that is stored in the Database and can be fetched by any other user.
 */
export interface PublicUserProfile extends IAFListEntry {
    displayName:string;
    email:string;
    emailVerified:boolean;
    isAnonymous:boolean;
    photoURL:string;
    providerData:ProviderData[];
    uid:string;
    section_uid?:string;
}

export interface ProviderData {
    displayName:string;
    email:string;
    photoURL:string;
    providerId:string;
    uid:string;
}

/* Sections */
export interface EsnSection extends IAFListEntry, IUid {
    name:string,
    city:string,
    university:string
    tags?:string
    url ?:string
    fbUrl ?:string
}



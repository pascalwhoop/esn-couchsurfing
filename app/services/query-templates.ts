export module QueryTemplates {
    export function userQuery(uid: string){
        return {
            orderByChild: 'uid',
            equalTo: uid
        };
    }
}

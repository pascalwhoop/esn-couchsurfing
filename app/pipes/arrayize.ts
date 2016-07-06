import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'arrayize'})
export class ArrayizePipe implements PipeTransform {
    transform(input, cSort:string, secLSort?:string) : any {
        let output = [];
        let sort = "key";
        //if custom sort defined
        sort = cSort ? cSort : sort;

        for (let key in input) {
            if(input.hasOwnProperty(key)){
                output.push({key: key, value: input[key]});
            }
        }

        //sort by the key defined. defaults to key sorting, can also be value sorting e.g.
        output = output.sort((a, b)=>{
            if(secLSort) return a[sort][secLSort] > b[sort][secLSort] ? 1 : -1; 
            return a[sort] > b[sort] ? 1 : -1;
        });
        return output;

    }
}
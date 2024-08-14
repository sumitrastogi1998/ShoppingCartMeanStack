import { PipeTransform, Pipe } from '@angular/core';
import { FileUser } from './model/fileuser';

@Pipe({
    name: 'bookSearch'
})

export class BooksFilterPipe implements PipeTransform {
    transform(items: FileUser[], searchByName: string) {
        if (items && items.length) {
            return items.filter(item => {
                
                if (searchByName && item.name.toLowerCase().indexOf(searchByName.toLowerCase()) === -1) {
                    return false;
                }
                
                return true;
            })
        }
        else {
            return items;
        }
    }
}
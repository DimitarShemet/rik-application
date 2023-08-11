import { Injectable } from '@angular/core';
import { FilterMask } from '../interfaces/filter-mask.interface';
import { User } from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filter(users: User[], mask: FilterMask): User[] {
    return users.filter((elem) => {
      const propAmount = Object.keys(mask).length;
      let counter = 0;
      for (const prop in mask) {
        counter++;
        const lastIteration = propAmount == counter;
        if (elem.hasOwnProperty(prop) && elem[prop] == mask[prop]) {
          if (lastIteration) {
            return true;
          }
          continue;
        }
        return false;
      }
      return false;
    });
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPhoneNumber',
  standalone: true,
})
export class formatPhoneNumber implements PipeTransform {
  transform(value: string | number | null): string | null {
    const formattedVal = value?.toString();
    return value
      ? `+${formattedVal[0]}(${formattedVal.slice(1, 4)})${formattedVal.slice(
          4
        )}`
      : null;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertCpf'
})
export class ConvertCpfPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var res = value.substr(0, 3);

    if (res == '000') {
      var cpf = value.substr(3, 3) + '.' + value.substr(6, 3) + '.' + value.substr(9, 3) + '-' + value.substr(12, 2)
    } else {
      var cpf = value.substr(0, 2) + '.' + value.substr(2, 3) + '.' + value.substr(5, 3) + '/' + value.substr(8, 4) + '-' + value.substr(12, 2)
    }
    
    return cpf;

  }

}

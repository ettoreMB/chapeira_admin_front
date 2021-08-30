import { FormEvent } from "react";

export function cnpj(e: FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 17;
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d)/, "$1.$2.$3/$4-$5");
  e.currentTarget.value = value;
  return e;
}


export function currency(e:FormEvent<HTMLInputElement>) {
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".")
  e.currentTarget.value = value;

  return e;
}

export function currencyBr(e:FormEvent<HTMLInputElement>) {
  let value:any = e.currentTarget.value;
  value = value.replace(/\D/g, "");
  value = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value/100);
  e.currentTarget.value = value;
  return e
}

export function dateFormat(e:FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 9;
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
  e.currentTarget.value = value;
  return e
}

export function convertDate(value: string) {
  var date = value;
  var newDate = date.split('/').reverse().join("-");
  return newDate

}

export function unmask(e:FormEvent<HTMLInputElement>) {
  let value:any = e.currentTarget.value;
  value = value.replace(/\D/g, "");
  e.currentTarget.value = value;
  return e
}

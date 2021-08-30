import { FormLabel, FormControl, Input as ChakraInput, InputProps as ChakraInputProps, FormErrorMessage } from '@chakra-ui/react';
import { FormEvent, useCallback } from 'react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError} from 'react-hook-form';

import { cnpj, currency, currencyBr, dateFormat } from '../../masks/masks'

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
  mask?: "cnpj" | "currency" | "currencyBr" | "dateFormat";
}


const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {name, label,mask, error=null, ...rest} ,ref) => {

    const handleKeyUp = useCallback((e: FormEvent<HTMLInputElement>) => {
      if(mask === "cnpj") {
        cnpj(e)
      }
  
      if(mask === 'currency'){
        currency(e)
      }

      if(mask === 'currencyBr'){
        currencyBr(e)
      }

      if(mask === 'dateFormat') {
        dateFormat(e)
      }
  
    }, [mask]);


  return (
    <FormControl isInvalid={!!error}>
      {!! label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        name={name}
        id={name}
        focusBorderColor='yellow.100'
        bgColor="gray.50"
        variant="filled"
        _hover={{
          bgColor: 'gray.100'
        }}
        size="lg"
        onKeyUp={handleKeyUp}
        ref={ref}
        {...rest}
      />
      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)



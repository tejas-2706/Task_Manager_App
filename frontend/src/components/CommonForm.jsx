import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../components/ui/form'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectContent, 
  SelectValue,
  SelectItem, 
} from '../components/ui/select' 

function CommonForm({formControls = [], handleSubmit, form, btnText, extraBtnStyles}) {
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        {
          formControls?.length > 0 ?
            formControls.map((controlItem) => (
              <FormField
                key={controlItem.id}
                control={form.control}
                name={controlItem.id}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{controlItem.label}</FormLabel>
                      {
                        controlItem.componentType === 'input' ? (
                          <FormControl>
                            <Input
                              placeholder={controlItem.placeholder || ''}
                              type={controlItem.type}
                              {...field}
                              value={field.value}
                              className='w-full text-2xl'
                              />
                          </FormControl>)
                          :
                          controlItem.componentType === 'select' ? (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger className='w-full '>
                                  {
                                  field.value ? 
                                    (<SelectValue
                                    className='text-black focus:text-black'
                                    placeholder={controlItem.placeholder}
                                    />) : ('Select')
                                  }
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {
                                  controlItem.options.map((optionItem) => (
                                    <SelectItem key={optionItem.id} value={optionItem.id}>
                                      {optionItem.label}
                                    </SelectItem>
                                  ))
                                }
                              </SelectContent>
                            </Select>
                          )
                          :
                          null
                      }
                    </FormItem>
                  );
                }}
              />
            ))
            : null}
        <Button className={`${extraBtnStyles ? extraBtnStyles : ''} mt-4 `} type={'submit'}>{btnText}</Button>
      </form>
    </Form>
  );
}

export default CommonForm

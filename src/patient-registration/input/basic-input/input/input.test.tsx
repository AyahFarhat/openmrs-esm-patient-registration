import React from 'react';
import { render, fireEvent, wait, screen } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { Input } from './input.component';

const setupInput = async (initialValues: object, inputProps: any) => {
  render(
    <Formik initialValues={initialValues} onSubmit={null}>
      <Form>
        <Input {...inputProps} light />
      </Form>
    </Formik>,
  );
  return screen.getByLabelText(inputProps.labelText) as HTMLInputElement;
};

const testInputExists = async (type: string, initialValues: object, inputProps: any) => {
  const input = await setupInput(initialValues, inputProps);
  expect(input.type).toEqual(type);
};

const testInputCanInputData = async (expected: any, initialValues: object, inputProps: any, field: string, valueKey: string) => {
  const input = await setupInput(initialValues, inputProps);

  fireEvent.change(input, { target: { [valueKey]: expected } });
  fireEvent.blur(input);

  await wait();

  expect(input[field]).toEqual(expected);
};

describe.skip('inputs', () => {
  it('number input exists', async () => {
    await testInputExists('number', { number: 0 }, { 
      id: 'number', labelText: 'Number', name: 'number' });
  });

  it('number input can input data', async () => {
    await testInputCanInputData(1, { number: 0 }, 
      {id: 'number', labelText: 'Number', name: 'number' }, 'valueAsNumber', 'valueAsNumber');
  });

  it('text input exists', async () => {
    await testInputExists('text', { text: '' },
      { id: 'text', labelText: 'Text', name: 'text', placeholder: 'Enter text' });
  });

  it('text input can input data', async () => {
    await testInputCanInputData('Some text', { text: '' }, 
      { id: 'text', labelText: 'Text', name: 'text', placeholder: 'Enter text' }, 'value', 'value');
  });

  it('telephone input exists', async () => {
    await testInputExists('tel', { telephoneNumber: '' }, 
      { id: 'tel', labelText: 'Telephone Number', name: 'telephoneNumber', placeholder: 'Enter telephone number' });
  });

  it('telephone input can input data', async () => {
    await testInputCanInputData('0800001066', { telephoneNumber: '' }, 
      { id: 'tel', labelText: 'Telephone Number', name: 'telephoneNumber', placeholder: 'Enter telephone number' }, 'value', 'value');
  });

  it('date input exists', async () => {
    await testInputExists('date', { date: '' }, 
      { id: 'date', labelText: 'Date', name: 'date' });
  });

  it('date input can input data', async () => {
    await testInputCanInputData('1990-09-10', { date: '' }, 
      { id: 'date', labelText: 'Date', name: 'date' }, 'value', 'value');
  });

  it('checkbox input exists', async () => {
    await testInputExists('checkbox', { checkbox: false }, 
      { id: 'checkbox', labelText: 'Checkbox', name: 'checkbox' });
  });

  it('checkbox input can input data', async () => {
    const input = await setupInput({ checkbox: false }, 
      { id: 'checkbox', labelText: 'Checkbox', name: 'checkbox' });
    fireEvent.click(input);
    fireEvent.blur(input);

    await wait();

    expect(input.checked).toEqual(true);
  });

  it('checkbox input can update data', async () => {
    const input = await setupInput({ checkbox: false }, 
      { id: 'checkbox', labelText: 'Checkbox', name: 'checkbox' });
    fireEvent.click(input);
    fireEvent.blur(input);

    fireEvent.click(input);
    fireEvent.blur(input);

    await wait();
    
    expect(input.checked).toEqual(false);
  });
});

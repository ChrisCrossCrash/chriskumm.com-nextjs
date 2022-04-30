import React from 'react'
import { FieldHookConfig, useField } from 'formik'
import styles from './TextInput.module.scss'

type TextInputProps = {
  variant: 'input' | 'textarea'
  label: string
  id: string
  className?: string
} & FieldHookConfig<string>

export const TextInput = React.forwardRef(function TextInputInner(
  props: TextInputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { variant, label, id, className, ...fieldProps } = props
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(fieldProps)
  const invalid = meta.touched && meta.error

  let inputElement

  if (props.variant === 'input') {
    inputElement = (
      <input
        className={`${styles.input} ${invalid ? styles.inputInvalid : ''}`}
        id={props.id}
        {...field}
      />
    )
  } else if (props.variant === 'textarea') {
    inputElement = (
      <textarea
        className={`${styles.textarea}
        ${invalid ? styles.textareaInvalid : ''}`}
        id={props.id}
        {...field}
      />
    )
  }

  return (
    <div ref={ref} className={`${styles.base} ${props.className}`}>
      <label
        className={`${styles.label} ${invalid ? styles.invalidText : ''}`}
        htmlFor={props.id || props.name}
      >
        {props.label}
      </label>
      {inputElement}
      {invalid && (
        <div className={`${styles.explanation} ${styles.invalidText}`}>
          {meta.error}
        </div>
      )}
    </div>
  )
})

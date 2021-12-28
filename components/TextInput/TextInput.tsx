import React from 'react'
import { FieldConfig, useField } from 'formik'
import styles from './TextInput.module.scss'

type TextInputProps = {
  variant: 'input' | 'textarea'
  label: string
  id: string
  className?: string
} & FieldConfig

export const TextInput = React.forwardRef(function TextInputInner(
  props: TextInputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props)
  const invalid = meta.touched && meta.error

  let inputElement

  if (props.variant === 'input') {
    inputElement = (
      <input
        className={`${styles.input} ${invalid && styles.inputInvalid}`}
        {...field}
        {...props}
      />
    )
  } else if (props.variant === 'textarea') {
    inputElement = (
      <textarea
        className={`${styles.textarea}
        ${invalid && styles.textareaInvalid}`}
        {...field}
        {...props}
      />
    )
  }

  return (
    <div ref={ref} className={`${styles.base} ${props.className}`}>
      <label
        className={`${styles.label} ${invalid && styles.invalidText}`}
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

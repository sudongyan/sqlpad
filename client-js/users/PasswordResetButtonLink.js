import React from 'react'
import Button from 'react-bootstrap/lib/Button'

const PasswordResetButtonLink = props => {
  const style = {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    display: 'block'
  }
  if (props.passwordResetId) {
    return (
      <span style={style}>
        <Button onClick={props.removePasswordResetLink}>remove</Button>{' '}
        <a href={'/password-reset/' + props.passwordResetId}>重设密码</a>
      </span>
    )
  }
  return (
    <Button style={style} onClick={props.generatePasswordResetLink}>
      获取重设密码的链接
    </Button>
  )
}

export default PasswordResetButtonLink

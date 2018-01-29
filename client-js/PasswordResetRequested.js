import React from 'react'
import FullscreenMessage from './common/FullscreenMessage.js'

export default props => {
  document.title = 'SQLPad - Password Reset'
  return (
    <FullscreenMessage>
      <p>重设密码请求已发送</p>
      <p>请查收邮件或联系管理员</p>
    </FullscreenMessage>
  )
}

import React from 'react'
import fetchJson from '../utilities/fetch-json.js'
import uuid from 'uuid'
import Alert from 'react-s-alert'
import UserList from './UserList'
import InviteUserForm from './InviteUserForm'

class UsersView extends React.Component {
  state = {
    users: [],
    isSaving: false
  }

  componentDidMount() {
    document.title = 'SQLPad - 用户'
    this.loadUsersFromServer()
  }

  handleDelete = user => {
    fetchJson('DELETE', '/api/users/' + user._id).then(json => {
      if (json.error) {
        return Alert.error('Delete Failed: ' + json.error.toString())
      }
      Alert.success('删除成功')
      this.loadUsersFromServer()
    })
  }

  loadUsersFromServer = () => {
    fetchJson('GET', '/api/users').then(json => {
      if (json.error) Alert.error(json.error)
      this.setState({ users: json.users })
    })
  }

  updateUserRole = user => {
    this.setState({ isSaving: true })
    fetchJson('PUT', '/api/users/' + user._id, {
      role: user.role
    }).then(json => {
      this.loadUsersFromServer()
      this.setState({ isSaving: false })
      if (json.error) {
        return Alert.error('更新失败: ' + json.error.toString())
      }
      Alert.success('更新成功')
    })
  }

  generatePasswordResetLink = user => {
    this.setState({ isSaving: true })
    const passwordResetId = uuid.v4()
    fetchJson('PUT', '/api/users/' + user._id, {
      passwordResetId
    }).then(json => {
      this.loadUsersFromServer()
      this.setState({ isSaving: false })
      if (json.error) {
        return Alert.error('更新失败: ' + json.error.toString())
      }
      Alert.success('密码链接获取成功')
    })
  }

  removePasswordResetLink = user => {
    this.setState({ isSaving: true })
    fetchJson('PUT', '/api/users/' + user._id, {
      passwordResetId: ''
    }).then(json => {
      this.loadUsersFromServer()
      this.setState({ isSaving: false })
      if (json.error) {
        return Alert.error('更新失败: ' + json.error.toString())
      }
      Alert.success('重设密码的链接删除成功')
    })
  }

  render() {
    const { config, currentUser } = this.props
    return (
      <div className="flex w-100">
        <UserList
          users={this.state.users}
          handleDelete={this.handleDelete}
          updateUserRole={this.updateUserRole}
          generatePasswordResetLink={this.generatePasswordResetLink}
          removePasswordResetLink={this.removePasswordResetLink}
          currentUser={currentUser}
        />
        <InviteUserForm
          loadUsersFromServer={this.loadUsersFromServer}
          config={config}
        />
      </div>
    )
  }
}

export default UsersView

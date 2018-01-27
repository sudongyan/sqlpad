import React from 'react'
import fetchJson from '../utilities/fetch-json.js'
import Alert from 'react-s-alert'
import Panel from 'react-bootstrap/lib/Panel'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Button from 'react-bootstrap/lib/Button'

const inviteUserFormStyle = {
  flexBasis: '50%',
  backgroundColor: '#FDFDFD',
  overflowY: 'auto',
  padding: 10
}

class InviteUserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      role: null,
      isInviting: null
    }
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onRoleChange = this.onRoleChange.bind(this)
    this.onInviteClick = this.onInviteClick.bind(this)
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  onRoleChange(e) {
    this.setState({
      role: e.target.value
    })
  }

  onInviteClick(e) {
    var user = {
      email: this.state.email,
      role: this.state.role
    }
    this.setState({
      isInviting: true
    })
    fetchJson('POST', '/api/users', user).then(json => {
      this.setState({
        isInviting: false
      })
      if (json.error) {
        return Alert.error('Whitelist failed: ' + json.error.toString())
      }
      Alert.success('User Whitelisted')
      this.setState({
        email: null,
        role: null
      })
      this.props.loadUsersFromServer()
    })
  }

  render() {
    return (
      <div style={inviteUserFormStyle}>
        <ControlLabel>验证用户</ControlLabel>
        <Panel>
          <Form>
            <p>
              加入白名单的用户长可以注册。 加入白名单后,
              邀请用户前往这个页面进行注册{' '}
              <a href={this.props.config.baseUrl + '/signup'}>注册页面</a>.
            </p>
            <p>
              <strong>Admin用户</strong> 可以添加和修改数据库连拉,
              以及邀请用户加入和添加白名单。
            </p>
            <hr />
            <FormGroup
              controlId="email"
              validationState={this.state.email ? null : 'warning'}
            >
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type="text"
                value={this.state.email || ''}
                onChange={this.onEmailChange}
              />
            </FormGroup>
            <FormGroup
              controlId="role"
              validationState={this.state.role ? null : 'warning'}
            >
              <ControlLabel>Role</ControlLabel>
              <FormControl
                componentClass="select"
                value={this.state.role || ''}
                onChange={this.onRoleChange}
              >
                <option value="" />
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </FormControl>
            </FormGroup>
            <Button
              onClick={this.onInviteClick}
              disabled={this.state.isInviting}
            >
              加入白名单
            </Button>
          </Form>
        </Panel>
      </div>
    )
  }
}

export default InviteUserForm

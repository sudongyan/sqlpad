import React from 'react'
import { Redirect } from 'react-router-dom'
import fetchJson from './utilities/fetch-json.js'
import Alert from 'react-s-alert'

class SignUp extends React.Component {
  state = {
    email: '',
    password: '',
    passwordConfirmation: '',
    redirect: false
  }

  componentDidMount() {
    document.title = 'SQLPad - Sign Up'
  }

  onEmailChange = e => {
    this.setState({ email: e.target.value })
  }

  onPasswordChange = e => {
    this.setState({ password: e.target.value })
  }

  onPasswordConfirmationChange = e => {
    this.setState({ passwordConfirmation: e.target.value })
  }

  signUp = e => {
    e.preventDefault()
    fetchJson('POST', '/api/signup', this.state).then(json => {
      if (json.error) return Alert.error(json.error)
      this.setState({ redirect: true })
    })
  }

  render() {
    const { redirect } = this.state
    if (redirect) {
      return <Redirect to="/" />
    }
    const adminRegistrationOpenIntro = () => {
      if (this.props.adminRegistrationOpen) {
        return (
          <div className="mb4">
            <h2 className="f3 tc">已启用管理员注册</h2>
            <p>
              欢迎使用 SQLPad! 系统中目前还没有管理员，你可以注册成为管理员。
              在你获得管理员权限后，只有被管理员加入白名单的用户才可以注册使用本系统。
            </p>
          </div>
        )
      }
    }
    return (
      <div className="pt5 measure center" style={{ width: '300px' }}>
        <form onSubmit={this.signUp}>
          <h1 className="f2 tc">SQLPad</h1>
          {adminRegistrationOpenIntro()}
          <input
            name="email"
            type="email"
            className="form-control mt3"
            placeholder="Email address"
            onChange={this.onEmailChange}
            required
          />
          <input
            name="password"
            type="password"
            className="form-control mt3"
            placeholder="Password"
            onChange={this.onPasswordChange}
            required
          />
          <input
            name="passwordConfirmation"
            type="password"
            className="form-control mt3"
            placeholder="Confirm Password"
            onChange={this.onPasswordConfirmationChange}
            required
          />
          <button className="btn btn-primary btn-block mt3" type="submit">
            注册
          </button>
        </form>
      </div>
    )
  }
}

export default SignUp

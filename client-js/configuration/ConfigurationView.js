import React from 'react'
import Alert from 'react-s-alert'
import Col from 'react-bootstrap/lib/Col'
import Form from 'react-bootstrap/lib/Form'
import AutoAffix from 'react-overlays/lib/AutoAffix'
import debounce from 'lodash.debounce'
import CheckListItem from './CheckListItem'
import ConfigEnvDocumentation from './ConfigEnvDocumentation'
import ConfigItemInput from './ConfigItemInput'
import fetchJson from '../utilities/fetch-json.js'

class ConfigurationView extends React.Component {
  state = {
    configItems: []
  }

  loadConfigValuesFromServer = () => {
    fetchJson('GET', '/api/config-items').then(json => {
      if (json.error) Alert.error(json.error)
      this.setState({ configItems: json.configItems })
    })
  }

  saveConfigValue = (key, value) => {
    fetchJson('POST', '/api/config-values/' + key, {
      value: value
    }).then(json => {
      if (json.error) {
        Alert.error('Save failed')
      } else {
        Alert.success('Value saved')
        this.loadConfigValuesFromServer()
      }
    })
  }

  componentDidMount() {
    document.title = 'SQLPad - Configuration'
    this.loadConfigValuesFromServer()
    this.saveConfigValue = debounce(this.saveConfigValue, 500)
  }

  render() {
    var configItemInputNodes = this.state.configItems
      .filter(config => config.interface === 'ui')
      .map(config => {
        return (
          <ConfigItemInput
            key={config.key}
            config={config}
            saveConfigValue={this.saveConfigValue}
          />
        )
      })
    return (
      <div>
        <Col sm={6} smOffset={1}>
          <div className="configBox">
            <h1 style={{ textAlign: 'center' }}>设置</h1>
            <hr />
            <Form horizontal>{configItemInputNodes}</Form>
            <hr />
            <p>
              有些配置只能通过环境变量或命令行界面(CLI)设置。下面是这些变量的当前值。敏感信息已遮避。将鼠标悬停在输入框上可查看更具体的信息。
            </p>
            <hr />
            <ConfigEnvDocumentation configItems={this.state.configItems} />
          </div>
        </Col>
        <Col sm={3} smOffset={1} style={{ paddingTop: 90 }}>
          <AutoAffix viewportOffsetTop={95}>
            <div className="panel panel-default">
              <div className="panel-body">
                <p>
                  <strong>功能清单</strong>
                </p>
                <p>提供相应的配置后可使用这些功能</p>
                <hr />
                <strong>Email</strong>
                <ul style={{ paddingLeft: 20 }}>
                  <CheckListItem
                    configKey={'smtpUser'}
                    configItems={this.state.configItems}
                  />
                  <CheckListItem
                    configKey={'smtpHost'}
                    configItems={this.state.configItems}
                  />
                  <CheckListItem
                    configKey={'smtpPort'}
                    configItems={this.state.configItems}
                  />
                  <CheckListItem
                    configKey={'smtpFrom'}
                    configItems={this.state.configItems}
                  />
                  <CheckListItem
                    configKey={'publicUrl'}
                    configItems={this.state.configItems}
                  />
                </ul>
                <strong>Google OAuth</strong>
                <ul style={{ paddingLeft: 20 }}>
                  <CheckListItem
                    configKey={'googleClientId'}
                    configItems={this.state.configItems}
                  />
                  <CheckListItem
                    configKey={'googleClientSecret'}
                    configItems={this.state.configItems}
                  />
                  <CheckListItem
                    configKey={'publicUrl'}
                    configItems={this.state.configItems}
                  />
                </ul>
              </div>
            </div>
          </AutoAffix>
        </Col>
      </div>
    )
  }
}

export default ConfigurationView

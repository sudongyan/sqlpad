import React from 'react'
import ReactDOM from 'react-dom'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Popover from 'react-bootstrap/lib/Popover'
import Overlay from 'react-bootstrap/lib/Overlay'

export default class extends React.Component {
  state = { show: false }

  toggle = () => {
    this.setState({ show: !this.state.show })
  }

  render() {
    if (this.props.queryResult && this.props.queryResult.incomplete) {
      const sharedProps = {
        show: this.state.show,
        target: () => ReactDOM.findDOMNode(this.refs.incompleteDataTarget)
      }
      return (
        <span className="red pointer mr2" onClick={this.toggle}>
          <Glyphicon glyph="warning-sign" ref="incompleteDataTarget" />{' '}
          未返回全部结果
          <Overlay {...sharedProps} placement="bottom">
            <Popover id="incomplete-data-popover" title={'Incomplete Data'}>
              你可以在请求中设定返回更少的行，
              或在系统设置中调整允许返回最大行数的值。
            </Popover>
          </Overlay>
        </span>
      )
    }
    return null
  }
}

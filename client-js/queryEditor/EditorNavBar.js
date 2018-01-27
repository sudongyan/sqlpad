import React from 'react'
import PropTypes from 'prop-types'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import Button from 'react-bootstrap/lib/Button'
import FormControl from 'react-bootstrap/lib/FormControl'

class EditorNavBar extends React.Component {
  onQueryNameChange = e => {
    this.props.onQueryNameChange(e.target.value)
  }

  render() {
    const {
      activeTabKey,
      onTabSelect,
      isSaving,
      isRunning,
      onCloneClick,
      onMoreClick,
      onSaveClick,
      onRunClick,
      onFormatClick,
      query,
      showValidation,
      unsavedChanges
    } = this.props

    const validationState =
      showValidation && !query.name.length ? 'error' : null
    const saveText = unsavedChanges ? '保存*' : '保存'
    const cloneDisabled = !query._id

    return (
      <Navbar fluid>
        <Nav activeKey={activeTabKey} bsStyle="pills" onSelect={onTabSelect}>
          <NavItem eventKey="sql">
            <span className="glyphicon glyphicon-align-left" /> SQL
          </NavItem>
          <NavItem eventKey="vis">
            <span className="glyphicon glyphicon-stats" /> 图表
          </NavItem>
        </Nav>
        <Nav>
          <NavItem
            eventKey={1}
            href="#"
            onClick={onCloneClick}
            disabled={cloneDisabled}
          >
            复制
          </NavItem>
          <NavItem eventKey={2} href="#" onClick={onFormatClick}>
            格式化
          </NavItem>
          <NavItem
            style={{ minWidth: 68 }}
            eventKey={3}
            href="#"
            onClick={onSaveClick}
            disabled={isSaving}
          >
            {saveText}
          </NavItem>
          <NavItem
            eventKey={4}
            href="#"
            onClick={onRunClick}
            disabled={isRunning}
          >
            运行
          </NavItem>
        </Nav>
        <Navbar.Form>
          <FormGroup
            validationState={validationState}
            style={{ marginTop: '-1px', marginLeft: 12 }}
          >
            <FormControl
              style={{
                width: 300,
                color: '#111',
                padding: '5px 12px',
                fontSize: '16px'
              }}
              type="text"
              placeholder="请输入一个名称"
              onChange={this.onQueryNameChange}
              value={query.name}
            />
          </FormGroup>
          <Button style={{ marginLeft: 4 }} onClick={onMoreClick}>
            &hellip;
          </Button>
        </Navbar.Form>
      </Navbar>
    )
  }
}

EditorNavBar.propTypes = {
  activeTabKey: PropTypes.string.isRequired,
  onTabSelect: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  isRunning: PropTypes.bool.isRequired,
  onCloneClick: PropTypes.func.isRequired,
  onMoreClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onRunClick: PropTypes.func.isRequired,
  onFormatClick: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  showValidation: PropTypes.bool.isRequired,
  unsavedChanges: PropTypes.bool.isRequired
}

export default EditorNavBar

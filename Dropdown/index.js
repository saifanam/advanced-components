import React from 'react';
import PropTypes from 'prop-types';
import Div from 'components/Base/Div';
import Span from 'components/Base/Span';
import Ul from 'components/Base/Ul';
import Li from 'components/Base/Li';
import Button from 'components/Base/Button';
import DropdownInactiveItem from 'components/Library/Widgets/DropdownInactiveItem';

import './style.css';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      display: '',
      prevValue: '',
    };
  }

  componentWillMount = () => {
    if (this.props.selectedValue || this.props.label) {
      this.setDisplayValue(this.props);
    }
    if (this.props.getImmediateValue) {
      this.props.handleClick(
        this.props.selectedValue,
        this.props,
        this.state.prevValue
      );
    }
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.closeDropdown);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedValue !== this.props.selectedValue) {
      this.setDisplayValue(nextProps);
    }
    if (
      nextProps.getImmediateValue &&
      nextProps.getImmediateValue !== this.props.getImmediateValue
    ) {
      this.setState(
        {
          prevValue: this.state.display,
        },
        () =>
          this.props.handleClick(
            nextProps.selectedValue,
            nextProps,
            this.state.prevValue
          )
      );
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.closeDropdown);
  }

  setDisplayValue = (props) => {
    const selectedValue = props.options.find(
      (option) => props.selectedValue === option.id
    );
    this.setState({
      display:
        typeof selectedValue !== 'undefined' ? selectedValue.name : props.label,
      prevValue: this.state.display,
    });
  };

  handleClick = (value) => {
    switch (value.active) {
      case undefined:
      case true:
        this.toggleDropdown();
        this.props.handleClick(value.id, this.props, this.state.prevValue);
        break;
      default:
        break;
    }
  };
  closeDropdown = (e) => {
    if (this.node && !this.node.contains(e.target)) {
      this.setState({
        active: false,
      });
    }
  };
  toggleDropdown = () => {
    this.setState({
      active: !this.state.active,
    });
  };
  render() {
    const showError = this.props.getImmediateValue && !this.props.selectedValue;
    const { inactiveMessage, options } = this.props;
    const optionList = [];
    options.forEach((elem, index) => {
      const isNotActive = elem.active !== undefined && !elem.active;
      const optionView = (
        <Li className={'DropdownList'} key={`'list_item_'${index}`}>
          <Button
            className={`DropdownListButton ${isNotActive ? 'Inactive' : ''}`}
            onClick={() => this.handleClick(elem)}
          >
            <Span className={`DropdownLabel ${isNotActive ? 'Inactive' : ''}`}>
              {elem.name}
            </Span>
            {isNotActive ? (
              <DropdownInactiveItem message={inactiveMessage} />
            ) : null}
          </Button>
        </Li>
      );
      optionList.push(optionView);
    });
    const isValueSelected = this.props.selectedValue !== '';
    return (
      <Div
        className={`${isValueSelected ? 'ValueSelected ' : ''}Dropdown`}
        reference={(ref) => {
          this.node = ref;
        }}
      >
        <Button
          className={`${this.state.active ? 'ActiveButton ' : ''}${
            showError ? 'DropdownError ' : ''
          }DropdownToggle`}
          onClick={this.toggleDropdown}
        >
          {isValueSelected && this.props.showFloatingLabel ? (
            <Span className={'FloatingLabel'}>{this.props.label}</Span>
          ) : null}
          <Span className="SelectItem">
            {window.gettext(this.state.display)}
          </Span>
          <Span className="DropdownIcon" />
        </Button>
        <Ul className={`${this.state.active ? 'Active ' : ''}DropdownMenu`}>
          {optionList}
        </Ul>
        {showError ? (
          <Div className={'Error'}>
            {window.gettext('Required information!')}
          </Div>
        ) : null}
      </Div>
    );
  }
}

Dropdown.propTypes = {
  options: PropTypes.array,
  selectedValue: PropTypes.string,
  name: PropTypes.string,
  inactiveMessage: PropTypes.string,
  label: PropTypes.string,
  handleClick: PropTypes.func,
  showFloatingLabel: PropTypes.bool,
  getImmediateValue: PropTypes.bool,
};

export default Dropdown;

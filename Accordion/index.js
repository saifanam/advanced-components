import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Base/Button';
import Div from 'components/Base/Div';
import Span from 'components/Base/Span';

import './style.css';

class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open || false,
      class: `Section${this.props.open ? ' Open' : ''}`,
      wrapHeight: 0,
      noTopBorder: !!this.props.noTopBorder,
      notLastItem: !!this.props.notLastItem,
    };
  }
  componentDidMount = () => {
    const contentHeight = this.props.accordHeight
      ? this.props.accordHeight
      : this.content.clientHeight;
    this.setState({
      wrapHeight: contentHeight,
    });
  };
  componentWillReceiveProps = (nextProps) => {
    if (this.state.open !== nextProps.open) {
      this.setState({
        open: nextProps.open,
      });
    }
  };
  componentDidUpdate = () => {
    const newHeight = this.props.accordHeight
      ? this.props.accordHeight
      : this.content.clientHeight;
    if (newHeight !== this.state.wrapHeight) {
      this.setState({
        wrapHeight: newHeight,
      });
    }
  };
  handleClick = () => {
    if (this.props.accordionClicked) {
      this.props.accordionClicked();
    }
    if (this.state.open) {
      this.setState({
        open: false,
        class: 'Section',
      });
    } else {
      this.setState({
        open: true,
        class: 'Section Open',
      });
    }
    if (this.props.handleClick) {
      this.props.handleClick(this.props.name);
    }
  };

  render() {
    const wrapSize = !this.state.open ? '0px' : this.state.wrapHeight;
    const contentStyles = {
      maxHeight: wrapSize,
    };
    let detail = null;
    if (this.props.isMulti) {
      detail = this.props.children;
    }
    return (
      <Div
        className={`${this.state.class} ${
          this.props.className ? this.props.className : ''
        } AccordionWrap`}
      >
        <Button
          className={`${this.state.open ? 'Active ' : ''}SectionHead ${
            this.state.noTopBorder ? 'NoTopBorder' : ''
          } ${this.state.notLastItem ? 'NotLastItem' : ''}`}
          onClick={this.handleClick}
        >
          {this.props.customHeader ? (
            <Div className={'CustomHeader'}>{this.props.customHeader}</Div>
          ) : (
            <Div className={this.props.rightLabel ? 'FlexWrapper' : ''}>
              <Span className={'Title'}>{this.props.title}</Span>
              {this.props.rightLabel ? (
                <Span className={'RightLabel'}>{this.props.rightLabel}</Span>
              ) : null}
            </Div>
          )}
        </Button>
        <Div
          className={`ContentWrap${this.state.open ? ' Open' : ''}`}
          style={contentStyles}
        >
          <Div
            className={'Content'}
            reference={(ref) => {
              this.content = ref;
            }}
          >
            {detail}
          </Div>
        </Div>
      </Div>
    );
  }
}

Accordion.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  open: PropTypes.bool,
  handleClick: PropTypes.func,
  isMulti: PropTypes.bool,
  noTopBorder: PropTypes.bool,
  notLastItem: PropTypes.bool,
  name: PropTypes.string,
  accordionClicked: PropTypes.func,
  className: PropTypes.string,
  rightLabel: PropTypes.string,
  accordHeight: PropTypes.string,
  customHeader: PropTypes.object,
};

export default Accordion;

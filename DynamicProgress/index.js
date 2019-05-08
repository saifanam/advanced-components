import React from 'react';
import PropTypes from 'prop-types';
import Div from 'components/Base/Div';
import './style.scss';

function DynamicProgress(props) {
  const { percentFilled, currentValue, totalValue } = props;
  const activeWidth = {
    width: `${percentFilled}%`,
  };
  const inactiveWidth = {
    width: `${100 - percentFilled}%`,
  };

  const inactiveDots = [];
  const activeDots = [];
  for (let i = 1; i < currentValue; i += 1) {
    activeDots.push(<Div className={'ProgressDot'} key={`dot_${i}`} />);
  }
  for (let i = 1; i < totalValue - currentValue; i += 1) {
    inactiveDots.push(
      <Div className={'ProgressDot Inactive'} key={`dot_${i}`} />
    );
  }

  return (
    <Div
      className={`${
        props.className ? `${props.className} ` : ''
      }ProgressBarWrap`}
    >
      {React.Children.toArray(props.children)}
      <Div className={'ProgressDotWrap Inactive'} style={inactiveWidth}>
        {inactiveDots}
      </Div>
      <Div className={'ProgressDotWrap'} style={activeWidth}>
        {activeDots}
      </Div>
      <Div className={'Filled'} style={activeWidth}>
        <Div className={'CurrentFraction'}>
          {window.gettext(`${currentValue}/${totalValue}`)}
        </Div>
      </Div>
    </Div>
  );
}

DynamicProgress.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  percentFilled: PropTypes.number,
  currentValue: PropTypes.number,
  totalValue: PropTypes.number,
};

DynamicProgress.defaultProps = {
  className: '',
};

export default DynamicProgress;

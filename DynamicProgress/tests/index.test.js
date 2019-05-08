import React from 'react';
import renderer from 'react-test-renderer';

import DynamicProgress from '../index';

describe('<DynamicProgress />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DynamicProgress />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

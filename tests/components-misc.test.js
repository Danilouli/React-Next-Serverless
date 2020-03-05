import React from 'react';
import renderer from 'react-test-renderer';
import ExampleLink from '../components/misc/ExampleLink/ExampleLink.jsx';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
test('Link changes the class when hovered', () => {
	const component = renderer.create(
		<ExampleLink page="http://www.facebook.com">Facebook</ExampleLink>,
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
	tree.props.onMouseEnter();
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
	expect(tree.props.className.split(' ').indexOf('hovered') >= 0).toEqual(true);
	expect(tree.props.className.split(' ').indexOf('normal') >= 0).toEqual(false);
	tree.props.onMouseLeave();
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
	expect(tree.props.className.split(' ').indexOf('hovered') >= 0).toEqual(false);
	expect(tree.props.className.split(' ').indexOf('normal') >= 0).toEqual(true);
	const link = shallow(<ExampleLink page="http://www.facebook.com">Facebook</ExampleLink>);
	link.simulate('mouseEnter');
	expect(link.hasClass('hovered')).toEqual(true);
});
import { asyncComponent } from '@jaredpalmer/after';

import Placeholder from './components/Placeholder';

export default [
	{
		path: '/',
		exact: true,
		component: asyncComponent({
			loader: () => import('./screens/Home'),
			Placeholder,
		}),
	},
	{
		path: '/about',
		exact: true,
		component: asyncComponent({
			loader: () => import('./screens/About'),
			Placeholder,
		}),
	},
];

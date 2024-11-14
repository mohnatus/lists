import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useActiveLists } from '@/db/hooks';

export const Home = () => {
	const navigate = useNavigate()
	const lists = useActiveLists();

	useEffect(() => {
		if (lists !== undefined && lists.length > 0) {
			navigate(`/list/${lists[0].id}`);
		}
	}, [lists]);

	return null;
};

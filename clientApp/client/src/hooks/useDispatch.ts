import { useDispatch as useReduxDispatch } from 'react-redux';
import { AppDispatch } from '../utilities/redux';

export const useDispatch = () => useReduxDispatch<AppDispatch>();
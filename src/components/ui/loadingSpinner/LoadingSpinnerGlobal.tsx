import { useLoadingStore } from '@/stores/states';
import { LoadingSpinner } from './LoadingSpinner';

export const LoadingSpinnerGlobal = () => {
  const store = useLoadingStore();
  return (
    <LoadingSpinner
      isLoading={store.isLoading}
      loadingMessage={store.loadingMessage}
    ></LoadingSpinner>
  );
};

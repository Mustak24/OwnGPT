import { useModelStore } from '@/features/Models/Store/modelStore';
import { MODEL_DOWNLOADING_INFO, MODEL_INFO } from '@/features/Models/Types';
import { createContext, useContext } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ModelStackParams } from '@/app/navigation/routes/ModelStack';

const Context = createContext<null | {
  model: MODEL_INFO;
  downloadingInfo: MODEL_DOWNLOADING_INFO;
}>(null);

export function ModelDetailsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { params } = useRoute<RouteProp<ModelStackParams, 'DetailsScreen'>>();

  const { model, downloadingInfo } = useModelStore(store => {
    const model = store.models.find(m => m.id === params.id)!;
    return {
      model,
      downloadingInfo: store.downloadingInfo[model.id],
    };
  });

  const states = {
    model,
    downloadingInfo,
  };

  return (
    <Context.Provider value={states}>
      {children}
    </Context.Provider>
  );
}

export function useModelDetailsContext() {
  const context = useContext(Context);
  if (!context)
    throw new Error(
      'useModelDetailsContext must be used within a ContextProvider',
    );
  return context;
}

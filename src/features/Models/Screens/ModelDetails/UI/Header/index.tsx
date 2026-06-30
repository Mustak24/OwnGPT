import { EntityHeader } from '@/shared/components';
import { useModelDetailsContext } from '../../Context';

export default function Header() {
  const { model } = useModelDetailsContext();
  return (
    <EntityHeader
      label={model.name}
      className="flex-row items-center justify-between"
    />
  );
}

import { useBag } from '@farfetch/blackout-react';
import ObjectRenderer from '../../app/ObjectRenderer';

function UseBagMembers() {
  const bagMembers = useBag({ enableAutoFetch: true });

  if (!bagMembers || !bagMembers.data) {
    return <span className="p-2">Loading...</span>;
  }

  return <ObjectRenderer data={bagMembers} header={'useBag members'} />;
}

export default UseBagMembers;

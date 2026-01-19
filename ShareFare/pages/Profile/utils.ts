import { ItemStatus, ProfileTab, Item } from "../../types";

export function getFilteredItems(
  activeTab: ProfileTab,
  items: Array<Item>,
  userId: string,
): Array<Item> {
  switch (activeTab) {
    case ProfileTab.POSTED:
      return items.filter(
        (i) =>
          i.ownerId === userId &&
          (i.status === ItemStatus.AVAILABLE ||
            i.status === ItemStatus.PENDING),
      );
    case ProfileTab.RECEIVED:
      return items.filter(
        (i) =>
          i.claimedById === userId &&
          (i.status === ItemStatus.RECEIVED ||
            i.status === ItemStatus.CLAIMED ||
            i.status === ItemStatus.PENDING),
      );
    case ProfileTab.DONATED:
      return items.filter(
        (i) => i.ownerId === userId && i.status === ItemStatus.DONATED,
      );
    default:
      return [];
  }
}

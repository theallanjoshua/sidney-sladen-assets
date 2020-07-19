export const HOME = '/';
export const SHOP = '/shop';
export const GALLERY = '/gallery';
export const STORIES = '/stories';
export const CONTACT = '/contact';

export const getPathFromLocation = () => window.location.hash.replace('#', '');

export const HOME_MENU_ITEM_TITLE = 'HOME';
export const SHOP_MENU_ITEM_TITLE = 'SHOP';
export const GALLERY_MENU_ITEM_TITLE = 'GALLERY';
export const STORIES_MENU_ITEM_TITLE = 'STORIES';
export const CONTACT_MENU_ITEM_TITLE = 'CONTACT';

export const PAGE_URL_TITLE_MAP = {
  [HOME]: HOME_MENU_ITEM_TITLE,
  [SHOP]: SHOP_MENU_ITEM_TITLE,
  [GALLERY]: GALLERY_MENU_ITEM_TITLE,
  [STORIES]: STORIES_MENU_ITEM_TITLE,
  [CONTACT]: CONTACT_MENU_ITEM_TITLE,
}
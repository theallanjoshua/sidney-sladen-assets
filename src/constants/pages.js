export const HOME = '/';
export const SHOP = '/shop';
export const GALLERY = '/gallery';
export const STORIES = '/stories';
export const CONTACT = '/schedule';

export const getPathFromLocation = () => window.location.hash.replace('#', '');

export const HOME_MENU_ITEM_TITLE = 'Home';
export const SHOP_MENU_ITEM_TITLE = 'Shop';
export const GALLERY_MENU_ITEM_TITLE = 'Gallery';
export const STORIES_MENU_ITEM_TITLE = 'Stories';
export const CONTACT_MENU_ITEM_TITLE = 'Schedule';

export const PAGE_URL_TITLE_MAP = {
  [HOME]: HOME_MENU_ITEM_TITLE,
  [SHOP]: SHOP_MENU_ITEM_TITLE,
  [GALLERY]: GALLERY_MENU_ITEM_TITLE,
  [STORIES]: STORIES_MENU_ITEM_TITLE,
  [CONTACT]: CONTACT_MENU_ITEM_TITLE,
}
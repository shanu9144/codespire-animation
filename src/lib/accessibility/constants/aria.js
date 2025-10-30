/**
 * ARIA Constants
 * Common ARIA attribute values and roles
 * 
 * @module lib/accessibility/constants/aria
 */

/**
 * Common ARIA roles
 */
export const ARIA_ROLES = {
  BUTTON: 'button',
  LINK: 'link',
  NAVIGATION: 'navigation',
  MENU: 'menu',
  MENUITEM: 'menuitem',
  DIALOG: 'dialog',
  ALERT: 'alert',
  ALERTDIALOG: 'alertdialog',
  BANNER: 'banner',
  COMPLEMENTARY: 'complementary',
  CONTENTINFO: 'contentinfo',
  MAIN: 'main',
  SEARCH: 'search',
  ARTICLE: 'article',
  REGION: 'region',
  TAB: 'tab',
  TABLIST: 'tablist',
  TABPANEL: 'tabpanel',
};

/**
 * ARIA live region priorities
 */
export const ARIA_LIVE_PRIORITIES = {
  POLITE: 'polite',
  ASSERTIVE: 'assertive',
  OFF: 'off',
};

/**
 * ARIA states
 */
export const ARIA_STATES = {
  EXPANDED: 'aria-expanded',
  SELECTED: 'aria-selected',
  HIDDEN: 'aria-hidden',
  DISABLED: 'aria-disabled',
  REQUIRED: 'aria-required',
  INVALID: 'aria-invalid',
};

/**
 * ARIA properties
 */
export const ARIA_PROPERTIES = {
  LABEL: 'aria-label',
  LABELLEDBY: 'aria-labelledby',
  DESCRIBEDBY: 'aria-describedby',
  CONTROLS: 'aria-controls',
  OWNS: 'aria-owns',
  ACTIVE_DESCENDANT: 'aria-activedescendant',
  CURRENT: 'aria-current',
};

export default {
  ARIA_ROLES,
  ARIA_LIVE_PRIORITIES,
  ARIA_STATES,
  ARIA_PROPERTIES,
};


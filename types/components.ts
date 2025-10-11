/**
 * Component Type Definitions
 * Shared interfaces and types for React components
 */

import { ReactNode, CSSProperties } from 'react';

// Base component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  id?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

// Animation-related props
export interface AnimationProps {
  delay?: number;
  duration?: number;
  easing?: string;
  trigger?: 'scroll' | 'hover' | 'click' | 'load';
  threshold?: number;
  once?: boolean;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
  progress?: number;
}

// Button variants
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

// Button props
export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  target?: string;
  rel?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

// Card variants
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';

// Typography variants
export type TypographyVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'body' | 'body-lg' | 'body-sm'
  | 'caption' | 'overline' | 'hero';

// Color variants
export type ColorVariant = 
  | 'primary' | 'secondary' | 'accent'
  | 'success' | 'warning' | 'error' | 'info'
  | 'neutral' | 'muted';

// Size variants
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

// Responsive breakpoints
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Animation easing functions
export type EasingFunction = 
  | 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'
  | 'cubic-bezier' | 'spring' | 'bounce' | 'elastic';

// Event handlers
export interface EventHandlers {
  onClick?: (event: React.MouseEvent) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onSubmit?: (event: React.FormEvent) => void;
  onChange?: (event: React.ChangeEvent) => void;
}

// Form field props
export interface FormFieldProps extends BaseComponentProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  value?: string | number;
  defaultValue?: string | number;
}

// Navigation props
export interface NavigationItem {
  label: string;
  href: string;
  icon?: ReactNode;
  children?: NavigationItem[];
  external?: boolean;
}

// SEO and metadata
export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
}

// API response types
export interface APIResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Pagination
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
}

// Modal/Dialog props
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  backdrop?: boolean;
}

// Tooltip props
export interface TooltipProps extends BaseComponentProps {
  content: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  delay?: number;
}

// Carousel props
export interface CarouselProps extends BaseComponentProps {
  items: ReactNode[];
  autoplay?: boolean;
  autoplayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  infinite?: boolean;
}

// Grid props
export interface GridProps extends BaseComponentProps {
  columns?: number | { [key in Breakpoint]?: number };
  gap?: SizeVariant;
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

// Flex props
export interface FlexProps extends BaseComponentProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: SizeVariant;
  alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

// Container props
export interface ContainerProps extends BaseComponentProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: SizeVariant;
  center?: boolean;
}

// Wrapper props
export interface WrapperProps extends BaseComponentProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
  center?: boolean;
}

// Section props
export interface SectionProps extends BaseComponentProps {
  background?: 'default' | 'muted' | 'primary' | 'secondary';
  padding?: SizeVariant;
  margin?: SizeVariant;
  fullWidth?: boolean;
  fullHeight?: boolean;
}

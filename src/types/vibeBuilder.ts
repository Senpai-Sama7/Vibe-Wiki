export interface StyleTokens {
  '--bg-color': string;
  '--text-color': string;
  '--primary-color': string;
  '--secondary-color': string;
  '--accent-color': string;
  '--border-color': string;
  '--card-bg': string;
  '--card-shadow': string;
  '--border-width': string;
  '--radius-sm': string;
  '--radius-md': string;
  '--radius-lg': string;
  '--font-heading': string;
  '--font-weight-bold': string;
  '--font-body'?: string;
  '--font-weight-normal'?: string;
  '--backdrop-filter'?: string;
  '--filter'?: string;
  [key: string]: string | undefined;
}

export interface OptionItem {
  label: string;
  slug: string;
  tokens?: StyleTokens;
}

export interface VibeBuilderState {
  style: string;
  layout: string;
  typography: string;
  palette: string;
  accessibility: string;
  performance: string;
  motion: string;
  visual: string;
}

export interface VibeBuilderOptions {
  style: OptionItem[];
  layout: OptionItem[];
  typography: OptionItem[];
  palette: OptionItem[];
  accessibility: OptionItem[];
  performance: OptionItem[];
  motion: OptionItem[];
  visual: OptionItem[];
}
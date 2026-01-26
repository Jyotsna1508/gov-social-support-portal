export const LANGUAGE = {
  EN: 'en' as const,
  AR: 'ar' as const
};
export type LanguageType = typeof LANGUAGE[keyof typeof LANGUAGE];

export const DIRECTION = {
    RTL: 'rtl',
    LTR: 'ltr'
}
import i18n from 'i18next';

export const getLocaleHelper = () => {
  const t: Function = i18n.t;
  return { t };
};
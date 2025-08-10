import { classNames, isRecord } from '@/css/classnames.js';

type ModValue = string | number | boolean | null | undefined;
type ModObject = Record<string, ModValue>;
type ModArray = Array<ModValue | ModObject | ModArray>;
type Mod = ModValue | ModObject | ModArray;

export interface BlockFn {
  (...mods: Mod[]): string;
}

export interface ElemFn {
  (elem: string, ...mods: Mod[]): string;
}

/**
 * Applies mods to the specified element.
 * @param element - element name.
 * @param mod - mod to apply.
 */
function applyMods(element: string, mod: Mod): string {
  if (Array.isArray(mod)) {
    return classNames(mod.map(m => applyMods(element, m)));
  }
  if (isRecord(mod)) {
    return classNames(
      Object.entries(mod).map(([mod, v]) => v && applyMods(element, mod)),
    );
  }
  const v = classNames(mod);
  return v && `${element}--${v}`;
}

/**
 * Computes final classname for the specified element.
 * @param element - element name.
 * @param mods - mod to apply.
 */
function computeClassnames(element: string, ...mods: Mod[]): string {
  return classNames(element, applyMods(element, mods));
}

/**
 * @returns A tuple, containing two functions. The first one generates classnames list for the
 * block, the second one generates classnames for its elements.
 * @param block - BEM block name.
 */
export function bem(block: string): [BlockFn, ElemFn] {
  return [
    (...mods) => computeClassnames(block, mods),
    (elem, ...mods) => computeClassnames(`${block}__${elem}`, mods),
  ];
}
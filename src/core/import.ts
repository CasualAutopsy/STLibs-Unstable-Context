import type { STModules } from '../types/st-modules';


type SlashCommandClosureModules =
    STModules['@slash-commands/SlashCommandBreakController'] &
    STModules['@slash-commands/SlashCommandClosure'] &
    STModules['@slash-commands/SlashCommandNamedArgumentAssignment'];

type SlashCommandEnumModules =
    STModules['@slash-commands/SlashCommandCommonEnumsProvider'] &
    STModules['@slash-commands/SlashCommandEnumValue'];



interface STModuleCategories {
    '$SlashCommand/Closures': SlashCommandClosureModules;
    '$SlashCommand/Enums': SlashCommandEnumModules;
}

const ROOT: string = '/';


const IMPORT_CATEGORIES: Record<keyof STModuleCategories, (keyof STModules)[]> = {
    '$SlashCommand/Closures': [
        '@slash-commands/SlashCommandBreakController',
        '@slash-commands/SlashCommandClosure',
        '@slash-commands/SlashCommandNamedArgumentAssignment',
    ],

    '$SlashCommand/Enums': [
        '@slash-commands/SlashCommandCommonEnumsProvider',
        '@slash-commands/SlashCommandEnumValue',
    ],
};

/**
 * Gets the list of modules to import for a given category.
 * @param catLabel - The label of the category to retrieve.
 * @returns The list of modules to import.
 */
function getCategory(catLabel: keyof STModuleCategories): (keyof STModules)[] {
    return IMPORT_CATEGORIES[catLabel];
}

/**
 * Gets the file path for a given module.
 * @param mod - The module to find the file path for.
 * @returns The module's file path.
 */
function getPath(mod: keyof STModules): string {
    if (mod === '@script')
        return ROOT + 'script.js';

    if (mod.startsWith('@scripts'))
        return ROOT + mod.slice(1) + '.js';

    if (
        mod.startsWith('@slash-commands') ||
        mod.startsWith('@macros') ||
        mod.startsWith('@autocomplete') ||
        mod.startsWith('@util') ||
        mod.startsWith('@extensions')
    )
        return ROOT + 'scripts/' + mod.slice(1) + '.js';

    throw new Error(`Cannot find path for module: ${mod}`);
}



/**
 * Resolves the import for a given module.
 * @param mod - The module to import.
 * @returns A promise for the imported module.
 */
async function resolveModuleImport<M extends keyof STModules>(mod: M): Promise<STModules[M]>{
    const url = getPath(mod);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await import(/* webpackIgnore: true */ url);
}

/**
 * Resolves the imports for a given import category.
 * @param catLabel - The label of the category to import.
 * @returns A promise for the imported category.
 */
async function resolveCategoryImport<C extends keyof STModuleCategories>(catLabel: C): Promise<STModuleCategories[C]> {
    const cat = getCategory(catLabel);

    const res = await Promise.all(
        cat.map(async (item) => {
            return await resolveModuleImport(item);
        }),
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Object.assign({}, ...res);
}

/**
 * Import a module from core SillyTavern.
 * @param module - The module to import.
 * @returns A promise for the imported module.
 */
export async function getUnstableContextModule<M extends keyof STModules>(module: M): Promise<STModules[M]> {
    return await resolveModuleImport(module);
}

/**
 * Import a category of modules from core SillyTavern.
 * @param category - The category to import.
 * @returns A promise for the imported category.
 */
export async function getUnstableContextCategory<C extends keyof STModuleCategories>(category: C): Promise<STModuleCategories[C]> {
    return await resolveCategoryImport(category);
}

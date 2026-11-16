import { getUnstableContextModule, getUnstableContextCategory } from './core/import';

globalThis.getUnstableContext = {
    module: getUnstableContextModule,
    category: getUnstableContextCategory,
};

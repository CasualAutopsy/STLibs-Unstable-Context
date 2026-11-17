import { getUnstableContextModule, getUnstableContextCategory } from './src/core/import';

declare global {
    var getUnstableContext: {
        module: typeof getUnstableContextModule;
        category: typeof getUnstableContextCategory;
    };
}

export {};

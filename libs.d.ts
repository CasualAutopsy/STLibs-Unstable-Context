declare global {
    function getUnstableSTContext(): ReturnType<typeof import('./index.js').getUnstableSTContext>;
}

export {};

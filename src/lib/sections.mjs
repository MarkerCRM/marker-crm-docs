// The two tabs and their sidebar groups, in order. The sidebar and the search's breadcrumbs both read this.
export const sections = [
    {
        id: 'guides',
        label: 'Guides',
        link: '/getting-started/',
        // Lucide book-open, drawn in the header.
        glyph: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
        groups: [
            {label: 'Getting started', directory: 'getting-started'},
            {label: 'Contacts', directory: 'contacts'},
            {label: 'Emails', directory: 'emails'},
            {label: 'Automations', directory: 'automations'},
            {label: 'Reports', directory: 'reports'},
            {label: 'Logs', directory: 'logs'},
            {label: 'Settings', directory: 'settings'},
        ],
        links: [{label: 'Add-ons', link: '/add-ons/'}],
    },
    {
        id: 'developers',
        label: 'Developers',
        link: '/developers/',
        // Lucide code-xml.
        glyph: '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>',
        groups: [
            {label: 'Start here', directory: 'developers/start'},
            {label: 'Automations', directory: 'developers/automations'},
            {label: 'Extending the CRM', directory: 'developers/extending'},
            {label: 'Reference', directory: 'developers/reference'},
        ],
        links: [],
    },
];

export const sidebarTopics = () => sections.map(({id, label, link, groups, links}) => ({
    id,
    label,
    link,
    items: [
        ...groups.map(group => ({label: group.label, items: [{autogenerate: {directory: group.directory}}]})),
        ...links,
    ],
}));

// The pages people look for most, listed on the home page.
export const popularPages = [
    {title: 'Import contacts from a CSV', url: '/contacts/import/'},
    {title: 'Send your first campaign', url: '/emails/campaigns/'},
    {title: 'Start an automation from a recipe', url: '/automations/'},
    {title: 'Turn on double opt-in', url: '/settings/opt-in/'},
    {title: 'Edit a live automation safely', url: '/automations/going-live/'},
];

/** Where a page sits, for a search result: `/contacts/tags/` → ['Guides', 'Contacts']. */
export const breadcrumbFor = (pathname) => {
    const path = pathname.replace(/^\/|\/$/g, '');
    const section = sections.find(entry => entry.id === 'developers' && (path === 'developers' || path.startsWith('developers/'))) || sections[0];
    const group = section.groups.find(entry => path === entry.directory || path.startsWith(`${entry.directory}/`));

    return [section.label, group?.label].filter(Boolean);
};

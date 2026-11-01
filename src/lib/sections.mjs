// The two tabs and their sidebar groups, in order. The sidebar and the search's breadcrumbs both read this.
export const sections = [
    {
        id: 'guides',
        label: 'Guides',
        link: '/getting-started/',
        icon: 'open-book',
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
        icon: 'puzzle',
        groups: [
            {label: 'Start here', directory: 'developers/start'},
            {label: 'Automations', directory: 'developers/automations'},
            {label: 'Extending the CRM', directory: 'developers/extending'},
            {label: 'Reference', directory: 'developers/reference'},
        ],
        links: [],
    },
];

export const sidebarTopics = () => sections.map(({id, label, link, icon, groups, links}) => ({
    id,
    label,
    link,
    icon,
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

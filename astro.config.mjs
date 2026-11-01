// @ts-check
import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightSidebarTopics from 'starlight-sidebar-topics';

export default defineConfig({
    site: 'https://docs.markercrm.com',
    integrations: [
        starlight({
            title: 'Marker CRM Docs',
            description: 'Guides for running Marker CRM in WordPress, and the reference for building on it.',
            logo: {light: './src/assets/logo-light.svg', dark: './src/assets/logo-dark.svg', replacesTitle: true},
            favicon: '/favicon.svg',
            customCss: ['@fontsource-variable/inter', './src/styles/theme.css'],
            editLink: {baseUrl: 'https://github.com/MarkerCRM/marker-crm-docs/edit/main/'},
            lastUpdated: true,
            social: [{icon: 'github', label: 'GitHub', href: 'https://github.com/MarkerCRM'}],
            components: {
                Header: './src/components/Header.astro',
                PageTitle: './src/components/PageTitle.astro',
                Footer: './src/components/Footer.astro',
            },
            plugins: [
                starlightSidebarTopics([
                    {
                        id: 'guides',
                        label: 'Guides',
                        link: '/getting-started/',
                        icon: 'open-book',
                        items: [
                            {label: 'Getting started', items: [{autogenerate: {directory: 'getting-started'}}]},
                            {label: 'Contacts', items: [{autogenerate: {directory: 'contacts'}}]},
                            {label: 'Emails', items: [{autogenerate: {directory: 'emails'}}]},
                            {label: 'Automations', items: [{autogenerate: {directory: 'automations'}}]},
                            {label: 'Reports', items: [{autogenerate: {directory: 'reports'}}]},
                            {label: 'Logs', items: [{autogenerate: {directory: 'logs'}}]},
                            {label: 'Settings', items: [{autogenerate: {directory: 'settings'}}]},
                            {label: 'Add-ons', link: '/add-ons/'},
                        ],
                    },
                    {
                        id: 'developers',
                        label: 'Developers',
                        link: '/developers/',
                        icon: 'puzzle',
                        items: [
                            {label: 'Start here', items: [{autogenerate: {directory: 'developers/start'}}]},
                            {label: 'Automations', items: [{autogenerate: {directory: 'developers/automations'}}]},
                            {label: 'Extending the CRM', items: [{autogenerate: {directory: 'developers/extending'}}]},
                            {label: 'Reference', items: [{autogenerate: {directory: 'developers/reference'}}]},
                        ],
                    },
                ], {exclude: ['/'], topics: {developers: ['/developers/']}}),
            ],
        }),
    ],
});

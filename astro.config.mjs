// @ts-check
import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import {sidebarTopics} from './src/lib/sections.mjs';

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
            components: {
                Header: './src/components/Header.astro',
                PageTitle: './src/components/PageTitle.astro',
                Footer: './src/components/Footer.astro',
                Search: './src/components/Search.astro',
            },
            plugins: [
                starlightSidebarTopics(sidebarTopics(), {exclude: ['/'], topics: {developers: ['/developers/']}}),
            ],
        }),
    ],
});

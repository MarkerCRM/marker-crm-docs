// @ts-check
import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import {sidebarTopics} from './src/lib/sections.mjs';

export default defineConfig({
    site: 'https://docs.markercrm.com',
    prefetch: {prefetchAll: true, defaultStrategy: 'hover'},
    integrations: [
        starlight({
            title: 'Marker CRM Docs',
            description: 'Guides for running Marker CRM in WordPress, and the reference for building on it.',
            logo: {light: './src/assets/logo-light.svg', dark: './src/assets/logo-dark.svg', replacesTitle: true},
            favicon: '/favicon.svg',
            head: [
                {tag: 'link', attrs: {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/brand/marker-crm-mark-32.png'}},
                {tag: 'link', attrs: {rel: 'apple-touch-icon', href: '/brand/marker-crm-mark-180.png'}},
                {tag: 'meta', attrs: {property: 'og:image', content: 'https://docs.markercrm.com/brand/marker-crm-social.png'}},
                {tag: 'meta', attrs: {name: 'twitter:card', content: 'summary_large_image'}},
                {tag: 'meta', attrs: {name: 'theme-color', content: '#171717'}},
            ],
            customCss: ['@fontsource-variable/inter', './src/styles/theme.css'],
            editLink: {baseUrl: 'https://github.com/MarkerCRM/marker-crm-docs/edit/main/'},
            lastUpdated: true,
            components: {
                Header: './src/components/Header.astro',
                PageTitle: './src/components/PageTitle.astro',
                Footer: './src/components/Footer.astro',
                Search: './src/components/Search.astro',
                Head: './src/components/Head.astro',
            },
            plugins: [
                starlightSidebarTopics(sidebarTopics(), {exclude: ['/'], topics: {developers: ['/developers/']}}),
            ],
        }),
    ],
});

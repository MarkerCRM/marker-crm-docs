import type {APIRoute, GetStaticPaths} from 'astro';
import {getCollection} from 'astro:content';
import {pageMarkdown} from '../lib/markdown';

export const getStaticPaths: GetStaticPaths = async () => (await getCollection('docs'))
    .filter(entry => entry.id !== 'index' && entry.body)
    .map(entry => ({params: {slug: entry.id}, props: {entry}}));

export const GET: APIRoute = ({props}) => new Response(pageMarkdown(props.entry), {
    headers: {'Content-Type': 'text/markdown; charset=utf-8'},
});

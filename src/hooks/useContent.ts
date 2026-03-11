import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useContent(section: string) {
    const [content, setContent] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchContent() {
            try {
                setLoading(true);
                const { data, error: fetchError } = await supabase
                    .from('site_content')
                    .select('*')
                    .eq('section', section);

                if (fetchError) throw fetchError;

                const contentMap = (data || []).reduce((acc: any, item: any) => {
                    acc[item.key] = {
                        text: item.content,
                        image: item.image_url
                    };
                    return acc;
                }, {});

                setContent(contentMap);
            } catch (err: any) {
                console.error(`Error fetching content for ${section}:`, err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchContent();
    }, [section]);

    return { content, loading, error };
}

export function useListContent<T>(table: string) {
    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchItems() {
            try {
                setLoading(true);
                const { data, error: fetchError } = await supabase
                    .from(table)
                    .select('*')
                    .order('order', { ascending: true });

                if (fetchError) throw fetchError;
                setItems(data || []);
            } catch (err: any) {
                console.error(`Error fetching list from ${table}:`, err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchItems();
    }, [table]);

    return { items, loading, error };
}

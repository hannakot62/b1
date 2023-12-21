const fetchOptions = {
    headers: {
        'x-access-token': import.meta.env.VITE_COINRANKING_API_KEY,
    },
};

export default fetchOptions
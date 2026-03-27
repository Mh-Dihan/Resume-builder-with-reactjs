export const normalizeLink = (value) => {
    if (!value) {
        return '';
    }

    if (/^https?:\/\//i.test(value)) {
        return value;
    }

    return `https://${value}`;
};

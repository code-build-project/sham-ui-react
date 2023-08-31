type TypeFormat = {
    [name: string]: Function,
};

const formatters: TypeFormat = {
    number(value: string): string {
        return value.replace(/[^\d.,]*/g, '');
    },
    letter(value: string) {
        return value.replace(/[^a-zA-ZА-Яа-яЁё\s-]/gi, '');
    },
    latin(value: string) {
        return value.replace(/[^a-z\s-]/gi, '');
    },
    cyrillic(value: string) {
        return value.replace(/[^а-яё\s-]/gi, '');
    },
    date(value: string) {
        value = formatters.number(value);

        const DAYS_IN_MONTH = 31;
        const MONTHS_IN_YEAR = 12;

        const day = value.slice(0, 2);
        const month = value.slice(3, 5);

        if (Number(day) > DAYS_IN_MONTH) {
            value = DAYS_IN_MONTH + value.slice(2);
        }
        if (Number(month) > MONTHS_IN_YEAR) {
            value = day + MONTHS_IN_YEAR + value.slice(5);
        }

        if (value.length > 2 && value.charAt(2) !== '.') {
            value = day + '.' + value.slice(2);
        }
        if (value.length > 5 && value.charAt(5) !== '.') {
            value = value.slice(0, 5) + '.' + value.slice(5);
        }
        if (value.length > 10) {
            value = value.slice(0, 10);
        }

        return value;
    },
};

export default formatters;
import React, { useState } from 'react';
import Input from 'components/common/Input';
import { ReactComponent as IconCalendar } from 'assets/icons/calendar.svg';
import { ReactComponent as IconClearField } from 'assets/icons/clearField.svg';
import { ReactComponent as IconChevron } from 'assets/icons/chevron.svg';
import formatters from 'helpers/formatters';
import styles from 'components/UI/Datepicker/styles.module.sass';
import monthsJSON from 'components/UI/Datepicker/months.json';
import weekdaysJSON from 'components/UI/Datepicker/weekdays.json';

type Props = {
    className?: string,
    value?: string,
    label?: string,
    placeholder?: string,
    isDisabled?: boolean,
    isReadonly?: boolean,
    isError?: boolean,
    message?: string,
    children?: string,
    updateValue?: (value: string) => void,
}

function Datepicker(prevProps: Props): JSX.Element {
    const props = {
        value: '',
        label: '',
        placeholder: '',
        isDisabled: false,
        isReadonly: false,
        isError: false,
        message: '',
        children: 'Button',
        updateValue: () => {},
        ...prevProps,
    };

    const [yearValue, setYearValue] = useState<number>(new Date().getFullYear());
    const [monthValue, setMonthValue] = useState<number>(new Date().getFullYear());
    const [dayValue, setDayValue] = useState<number>(new Date().getFullYear());

    const yearList = (() => {
        const minYear = 1980;
        const maxYear = 2064;
        let yearsArray: number[] = [];
    
        for (let i = minYear; i <= maxYear; i++) {
            yearsArray.push(i);
        }
    
        return yearsArray;
    })();
    
    const monthList = monthsJSON;
    const dayWeekList = weekdaysJSON;

    const dayMonthList = (() => {
        const maxWeekDays = 7;
        let arrayIndex: number = 0;
        let daysArray: number[][] = [[]];
        const daysInMonth: number = new Date(yearValue, monthValue + 1, 0).getDate();
    
        for (let i = 1; i <= daysInMonth; i++) {
            daysArray[arrayIndex].push(i);
    
            if (i % maxWeekDays === 0) {
                arrayIndex++;
                daysArray.push([]);
            }
        }
    
        return daysArray;
    })();

    const getDayClasses = (day: number) => {
        return `
            ${styles['day']}
            ${dayValue === day && styles['day-active']}
        `;
    };

    const setMonth = (operation: boolean) => {
        let newIndex: number = 0;
        const lastIndexMonth = monthList.length - 1;
        const indexMonth = monthList.findIndex(item => item.id === monthValue);
    
        if (operation) {        
            newIndex = indexMonth === lastIndexMonth ? 0 : indexMonth + 1;
        } else {
            newIndex = indexMonth === 0 ? lastIndexMonth : indexMonth - 1;
        }
    
        setMonthValue(monthList[newIndex].id);
    };

    const setDay = (day: number) => {
        setDayValue(day);
    
        const date = new Date(yearValue, monthValue, dayValue);
        const newDate = date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    
        setTimeout( () => {
            props.updateValue(newDate);
            onBlur('calendar');
        }, 100);
    };

    const componentClasses = `
        ${props.isError && styles['error']}
    `;

    // BLOCK "label"
    const isLabel = props.children || props.label;

    // BLOCK "focus and blur"        
    const [focusList, setFocusList] = useState<{ [key: string]: boolean }>({
        input: false,
        month: false,
        year: false,
        calendar: false,
    });

    const isOpenCalendar = Object.values(focusList).some(item => !!item);

    const onFocus = (key: string) => {
        setFocusList((prevFocusList) => {
            const newFocusList = { ...prevFocusList };
            newFocusList[key] = true;

            return newFocusList;
        });
    };

    const onBlur = (key: string) => {
        setTimeout(() => {
            setFocusList((prevFocusList) => {
                const newFocusList = { ...prevFocusList };
                newFocusList[key] = false;

                return newFocusList;
            });
            checkDate();
        }, 100);
    };

    // BLOCK "input"
    const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value = formatters.date(event.target.value);
        props.updateValue(event.target.value);
    };

    const checkDate = () => {
        const requiredDateLength = 10;
        const isValidDateLength = props.value && props.value.length < requiredDateLength;

        if (isValidDateLength && !isOpenCalendar) {
            props.updateValue('');
        }
    };

    // BLOCK "clear"
    const isIconClear = !!props.value.length;

    const clearField = (event: React.MouseEvent) => {
        event.stopPropagation();
        props.updateValue('');
    };

    return (
        <div className={`${styles['datepicker']} ${props.className}`}>
            {isLabel &&
                <div className={styles['label']}>
                    {props.children || props.label}
                </div>
            }

            <Input
                className={componentClasses}
                value={props.value}
                placeholder={props.placeholder}
                isDisabled={props.isDisabled}
                isReadonly={props.isReadonly}
                onFocus={() => onFocus('input')}
                onBlur={() => onBlur('input')}
                onInput={onInput}
            >
                {{
                    right: isIconClear &&
                    <IconClearField
                        className={styles['icon-clear']}
                        onClick={clearField}
                    />,
                    left: <IconCalendar className={styles['icon-calendar']} />,
                }}
            </Input>

            {props.message &&
                <div className={styles['message']}>
                    {props.message}
                </div>
            }

            {isOpenCalendar &&
                <div
                    className={styles['calendar']}
                    onFocus={() => onFocus('calendar')}
                    onBlur={() => onBlur('calendar')}
                    tabIndex={0}
                >
                    <div className={styles['calendar-heaeder']}>
                        <IconChevron
                            className={styles['prev']}
                            onClick={() => setMonth(false)}
                        />

                        <select
                            className={styles['calendar-select']}
                            value={monthValue}
                            onFocus={() => onFocus('month')}
                            onBlur={() => onBlur('month')}
                            onChange={(e) => setMonthValue(Number(e.target.value))}
                        >
                            {monthList.map(month =>
                                <option
                                    key={month.id}
                                    value={month.id}
                                >
                                    {month.name}
                                </option>,
                            )}
                        </select>

                        <select
                            className={styles['calendar-select']}
                            value={yearValue}
                            onFocus={() => onFocus('year')}
                            onBlur={() => onBlur('year')}
                            onChange={(e) => setYearValue(Number(e.target.value))}
                        >
                            {yearList.map(year =>
                                <option
                                    key={year}
                                    value={year}
                                >
                                    {year}
                                </option>,
                            )}
                        </select>

                        <IconChevron
                            className={styles['next']}
                            onClick={() => setMonth(true)}
                        />
                    </div>

                    <div className={styles['calendar-body']}>
                        <div className={styles['week']}>
                            {dayWeekList.map(dayWeek =>
                                <div
                                    className={styles['week-day']}
                                    key={dayWeek}
                                >
                                    {dayWeek.toUpperCase()}
                                </div>,
                            )}
                        </div>

                        <div className={styles['day-list']}>
                            {dayMonthList.map((week, index) =>
                                <div
                                    className={styles['day-row']}
                                    key={index}
                                >
                                    {week.map(day =>
                                        <div
                                            className={getDayClasses(day)}
                                            key={day}
                                            onClick={() => setDay(day)}
                                        >
                                            {day}
                                        </div>,
                                    )}
                                </div>,
                            )}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Datepicker;